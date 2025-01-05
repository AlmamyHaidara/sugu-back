import { Injectable } from '@nestjs/common';
import { CreateCommandDto, EtatCommand } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { ExeceptionCase } from 'src/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PrixService } from 'src/prix/prix.service';

@Injectable()
export class CommandService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UsersService,
    private readonly prix: PrixService,
  ) {}

  async create(createCommandDto: CreateCommandDto) {
    try {
      // Vérification de l'utilisateur
      const usr = await this.user.findOneById(createCommandDto.usetilisateurId);
      if (!usr || !usr.id) {
        throw new Error('Utilisateur non trouvé.');
      }

      // Vérification des prix associés aux lignes de commande
      const prixIds = createCommandDto.ligneCommands.map((lc) => lc.prixId);
      const prixExistants = await this.prisma.prix.findMany({
        where: { id: { in: prixIds } },
        select: { id: true },
      });

      if (prixExistants.length !== prixIds.length) {
        throw new Error(
          'Certains prix associés aux lignes de commande sont introuvables.',
        );
      }

      // Utilisation d'une transaction pour assurer l'intégrité des données
      const result = await this.prisma.$transaction(async (prisma) => {
        // Création de la commande
        const cmd = await prisma.commande.create({
          data: {
            utilisateurs: {
              connect: {
                id: createCommandDto.usetilisateurId,
              },
            },
            etat: createCommandDto.etat,
            commandeNbr: createCommandDto.commandeNbr,
            LigneCommand: {
              createMany: {
                data: createCommandDto.ligneCommands || [],
              },
            },
          },
        });

        // Mise à jour des quantités pour chaque ligne
        for (const element of createCommandDto.ligneCommands) {
          const prix = await prisma.prix.findUnique({
            where: { id: element.prixId },
            select: { quantiter: true },
          });

          if (
            !prix ||
            prix.quantiter === undefined ||
            prix.quantiter < element.quantiter
          ) {
            throw new Error(
              `Quantité insuffisante pour le prix ID ${element.prixId}.`,
            );
          }

          await prisma.prix.update({
            where: { id: element.prixId },
            data: { quantiter: prix.quantiter - element.quantiter },
          });
        }

        return cmd;
      });

      await this.prisma.panier.deleteMany({
        where: {
          utilisateurId: createCommandDto.usetilisateurId,
        },
      });

      return {
        status: 201,
        data: result,
      };
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      throw error; // Relance l'erreur pour une gestion en amont
    }
  }

  async findAll(userId: number) {
    try {
      const cmd = await this.prisma.commande.findMany({
        where: {
          utilisateurId: userId,
        },
        select: {
          LigneCommand: {
            include: {
              Prix: {
                include: {
                  boutiques: true,
                  produits: true,
                },
              },
            },
          },
        },
      });

      return cmd || [];
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async findOne(id: number, userId: number) {
    try {
      const cmd = await this.prisma.commande.findFirst({
        where: {
          id: id,
          utilisateurId: userId,
        },
        select: {
          LigneCommand: {
            include: {
              Prix: {
                include: {
                  boutiques: true,
                  produits: true,
                },
              },
            },
          },
        },
      });

      return {
        status: 200,
        data: cmd || {},
      };
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async updateCommandeEtat(commandeId: number, nouvelEtat: EtatCommand) {
    try {
      // Récupérer la commande avec les lignes associées
      const commande = await this.prisma.commande.findUnique({
        where: { id: commandeId },
        include: { LigneCommand: true }, // Inclure les lignes de commande associées
      });

      if (!commande) {
        throw new Error(`Commande avec l'ID ${commandeId} introuvable.`);
      }

      if (commande.etat === nouvelEtat && nouvelEtat === nouvelEtat) {
        return {
          status: 400,
          message: `La commande est déjà ${nouvelEtat}.`,
        };
      }

      // Gestion des transitions d'état
      if (commande.etat === 'ANNULER' && nouvelEtat !== 'ANNULER') {
        // Si on quitte l'état "ANNULER", soustraire à nouveau les quantités
        await this.prisma.$transaction(async (prisma) => {
          for (const ligne of commande.LigneCommand) {
            const prix = await prisma.prix.findUnique({
              where: { id: ligne.prixId },
              select: { quantiter: true },
            });

            if (
              !prix ||
              prix.quantiter === undefined ||
              prix.quantiter < ligne.quantiter
            ) {
              throw new Error(
                `Quantité insuffisante pour le produit ID ${ligne.prixId}.`,
              );
            }

            await prisma.prix.update({
              where: { id: ligne.prixId },
              data: { quantiter: prix.quantiter - ligne.quantiter },
            });
          }

          // Modifier l'état de la commande
          await prisma.commande.update({
            where: { id: commandeId },
            data: { etat: nouvelEtat },
          });
        });

        console.log(
          `Commande passée de l'état ANNULER à ${nouvelEtat}, quantités ajustées.`,
        );
      } else if (nouvelEtat === 'ANNULER') {
        // Si l'état devient "ANNULER", restituer les quantités
        await this.prisma.$transaction(async (prisma) => {
          for (const ligne of commande.LigneCommand) {
            const prix = await prisma.prix.findUnique({
              where: { id: ligne.prixId },
              select: { quantiter: true },
            });

            if (!prix || prix.quantiter === undefined) {
              throw new Error(
                `Impossible de restaurer la quantité pour le produit ID ${ligne.prixId}.`,
              );
            }

            await prisma.prix.update({
              where: { id: ligne.prixId },
              data: { quantiter: prix.quantiter + ligne.quantiter },
            });
          }

          // Modifier l'état de la commande
          await prisma.commande.update({
            where: { id: commandeId },
            data: { etat: nouvelEtat },
          });
        });

        console.log(`Commande annulée avec succès et quantités restaurées.`);
      } else {
        // Modifier simplement l'état si ce n'est pas une transition liée à "ANNULER"
        await this.prisma.commande.update({
          where: { id: commandeId },
          data: { etat: nouvelEtat },
        });

        console.log(`État de la commande mis à jour en ${nouvelEtat}.`);
      }

      return {
        status: 200,
        message: 'Commande mise à jour avec succès.',
      };
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la commande :', error);
      throw error; // Relancer l'erreur pour gestion en amont
    }
  }

  // update(id: number, updateCammandDto: UpdateCommandDto) {
  //   try {
  //   } catch (error) {
  //     console.error(error);
  //     ExeceptionCase(error);
  //   }
  // }

  // remove(id: number) {
  //   try {
  //   } catch (error) {
  //     console.error(error);
  //     ExeceptionCase(error);
  //   }
  // }
}
