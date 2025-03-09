import { Injectable } from '@nestjs/common';
import { CreateCommandDto, EtatCommand } from './dto/create-command.dto';
import { ExeceptionCase } from 'src/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PrixService } from 'src/prix/prix.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class CommandService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UsersService,
    private readonly prix: PrixService,
    private readonly notification: NotificationsService,
  ) {}

  // async create(createCommandDto: CreateCommandDto) {
  //   try {
  //     const ligneCommandInfo = [];
  //     // Vérification de l'utilisateur
  //     const usr = await this.user.findOneById(createCommandDto.usetilisateurId);
  //     if (!usr || !usr.id) {
  //       throw new Error('Utilisateur non trouvé.');
  //     }

  //     // Vérification des prix associés aux lignes de commande
  //     const prixIds = createCommandDto.ligneCommands.map((lc) => lc.prixId);
  //     const prixExistants = await this.prisma.prix.findMany({
  //       where: { id: { in: prixIds } },
  //       select: { id: true },
  //     });

  //     if (prixExistants.length !== prixIds.length) {
  //       throw new Error(
  //         'Certains prix associés aux lignes de commande sont introuvables.',
  //       );
  //     }

  //     // Utilisation d'une transaction pour assurer l'intégrité des données
  //     const result = await this.prisma.$transaction(async (prisma) => {
  //       // Création de la commande
  //       const cmd = await prisma.commande.create({
  //         data: {
  //           utilisateurs: {
  //             connect: {
  //               id: createCommandDto.usetilisateurId,
  //             },
  //           },
  //           etat: createCommandDto.etat,
  //           commandeNbr: createCommandDto.commandeNbr,
  //           LigneCommand: {
  //             createMany: {
  //               data: createCommandDto.ligneCommands || [],
  //             },
  //           },
  //         },
  //       });

  //       // Mise à jour des quantités pour chaque ligne
  //       for (const element of createCommandDto.ligneCommands) {
  //         const prix = await prisma.prix.findUnique({
  //           where: { id: element.prixId },
  //           select: {
  //             quantiter: true,
  //             id: true,
  //             boutiques: true,
  //             produits: true,
  //             prix: true,
  //           },
  //         });
  //         ligneCommandInfo.push({
  //           ...prix,
  //         });
  //         if (
  //           !prix ||
  //           prix.quantiter === undefined ||
  //           prix.quantiter < element.quantiter
  //         ) {
  //           throw new Error(
  //             `Quantité insuffisante pour le prix ID ${element.prixId}.`,
  //           );
  //         }

  //         await prisma.prix.update({
  //           where: { id: element.prixId },
  //           data: { quantiter: prix.quantiter - element.quantiter },
  //         });
  //       }

  //       return cmd;
  //     });

  //     await this.prisma.panier.deleteMany({
  //       where: {
  //         utilisateurId: createCommandDto.usetilisateurId,
  //       },
  //     });

  //     const newNotification = await this.prisma.notification.create({
  //       data: {
  //         title: 'Création de commande',
  //         type: 'INFO',
  //         message: `Nous avons le plaisir de vous confirmer que votre commande a été acceptée et est en cours de traitement. Vous recevrez prochainement un e-mail de confirmation avec les détails de votre commande et les informations de suivi.
  //         Nous vous remercions pour votre confiance et restons à votre disposition pour toute question supplémentaire.`,
  //         data: {
  //           commandNbr: createCommandDto.commandeNbr,
  //           ligneCommand: ligneCommandInfo,
  //           etat: result.etat,
  //           createdAt: result.createdAt,
  //         },
  //         status: 'UNREAD',
  //         utilisateurId: createCommandDto.usetilisateurId,
  //         // utilisateur: {
  //         //   connect: {
  //         //     id: createCommandDto.usetilisateurId,
  //         //   },
  //         // },
  //       },
  //     });

  //     const newNotificationBoutiquier = await this.prisma.notification.create({
  //       data: {
  //         title: 'Nouvelle commande reçue',
  //         type: 'ORDER',
  //         message: `Une nouvelle commande a été passée sur votre boutique. Veuillez consulter les détails ci-dessous pour préparer l'expédition.`,
  //         data: {
  //           commandNbr: createCommandDto.commandeNbr,
  //           ligneCommand: ligneCommandInfo,
  //           etat: result.etat,
  //           createdAt: result.createdAt,
  //         },
  //         status: 'UNREAD',
  //         utilisateurId: createCommandDto.usetilisateurId,
  //         // utilisateur: {
  //         //   connect: {
  //         //     id: createCommandDto.usetilisateurId,
  //         //   },
  //         // },
  //       },
  //     });

  //     console.log(newNotification);

  //     return {
  //       status: 201,
  //       data: result,
  //     };
  //   } catch (error) {
  //     console.error('Erreur lors de la création de la commande:', error);
  //     throw error;
  //   }
  // }

  async create(createCommandDto: CreateCommandDto) {
    try {
      const ligneCommandInfo: any[] = [];
      // Vérification de l'utilisateur
      const usr = await this.prisma.utilisateur.findFirst({
        where: {
          id: createCommandDto.usetilisateurId,
          Adresse: {
            some: {
              id: createCommandDto.adresseId,
            },
          },
        },
        omit: {
          password: true,
          updatedAt: true,
        },
        include: {
          Adresse: {
            where: {
              id: createCommandDto.adresseId,
            },
          },
        },
      });
      // const usr = await this.user.findOneById(createCommandDto.usetilisateurId);
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

        // Pour chaque ligne de commande, vérifier les quantités et mettre à jour le stock
        for (const element of createCommandDto.ligneCommands) {
          const prix = await prisma.prix.findUnique({
            where: { id: element.prixId },
            select: {
              quantiter: true,
              id: true,
              // On récupère ici l'information de la boutique associée au prix
              boutiques: {
                select: { id: true },
              },
              produits: true,
              prix: true,
            },
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

          // On enrichit la ligne avec l'identifiant de la boutique (en supposant que "boutiques" est un objet)
          ligneCommandInfo.push({
            ...prix,
            boutiqueId: prix.boutiques?.id,
          });

          await prisma.prix.update({
            where: { id: element.prixId },
            data: { quantiter: prix.quantiter - element.quantiter },
          });
        }

        return cmd;
      });

      // Suppression des articles dans le panier
      await this.prisma.panier.deleteMany({
        where: {
          utilisateurId: createCommandDto.usetilisateurId,
        },
      });

      // Notification destinée au client
      await this.prisma.notification.create({
        data: {
          title: 'Création de commande',
          type: 'INFO',
          message: `Nous avons le plaisir de vous confirmer que votre commande a été acceptée et est en cours de traitement.
  Vous recevrez prochainement un e-mail de confirmation avec les détails de votre commande et les informations de suivi.
  Nous vous remercions pour votre confiance.`,
          data: {
            commandNbr: createCommandDto.commandeNbr,
            ligneCommand: ligneCommandInfo,
            etat: result.etat,
            createdAt: result.createdAt,
          },
          status: 'UNREAD',
          utilisateurId: createCommandDto.usetilisateurId,
        },
      });

      // Regroupement des lignes de commande par boutique
      const commandesParBoutique = ligneCommandInfo.reduce(
        (acc, ligne) => {
          const boutiqueId = ligne.boutiqueId;
          if (!boutiqueId) return acc;
          if (!acc[boutiqueId]) {
            acc[boutiqueId] = [];
          }
          acc[boutiqueId].push(ligne);
          return acc;
        },
        {} as Record<string, any[]>,
      );

      // Pour chaque boutique, envoyer une notification au boutiquier concerné
      for (const boutiqueId in commandesParBoutique) {
        // Récupérer les informations de la boutique (notamment l'identifiant du propriétaire/boutiquier)
        const boutique = await this.prisma.boutique.findUnique({
          where: { id: Number(boutiqueId) },
          select: { id: true, userId: true },
        });

        if (!boutique || !boutique.userId) continue;

        await this.prisma.notification.create({
          data: {
            title: 'Nouvelle commande reçue',
            type: 'ORDER',
            message: `Une nouvelle commande contenant des produits pour votre boutique a été passée. Veuillez consulter les détails ci-dessous pour préparer l'expédition.`,
            data: {
              commandId: result.id,
              commandNbr: createCommandDto.commandeNbr,
              ligneCommand: commandesParBoutique[boutiqueId],
              etat: result.etat,
              createdAt: result.createdAt,
              client: { ...usr },
              adresse: { ...usr.Adresse[0] },
            },
            status: 'UNREAD',
            utilisateurId: boutique.userId,
          },
        });
      }

      return {
        status: 201,
        data: result,
      };
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      throw error;
    }
  }

  async findAll(userId: number) {
    try {
      const cmd = await this.prisma.commande.findMany({
        where: {
          utilisateurId: userId,
        },
        select: {
          id: true,
          commandeNbr: true,
          createdAt: true,
          etat: true,
          LigneCommand: {
            include: {
              Prix: {
                include: {
                  boutiques: {
                    select: {
                      id: true,
                      nom: true,
                      categorie: true,
                      location: true,
                      description: true,
                      phone: true,
                    },
                  },
                  produits: true,
                },
              },
            },
          },
        },
      });

      const isFiltered = cmd.flatMap((res) => {
        const filter = res.LigneCommand.map((lc) => {
          const newLc = { ...lc, ...lc.Prix };
          delete newLc.Prix;

          return newLc;
        });

        const total = filter.reduce((acc: any, prev) => {
          return (prev.prix += acc);
        }, 0);
        console.log(total);
        return { ...res, LigneCommand: [...filter], total };
      });

      return isFiltered || [];
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async findOne(id: number, userId: number) {
    try {
      const resultes = await this.prisma.commande.findFirst({
        where: {
          id: id,
          utilisateurId: userId,
        },
        select: {
          id: true,
          commandeNbr: true,
          utilisateurs: {
            select: {
              id: true,
              Adresse: true,
              email: true,
              nom: true,
              prenom: true,
              telephone: true,
            },
          },
          createdAt: true,

          etat: true,
          LigneCommand: {
            include: {
              Prix: {
                include: {
                  produits: {
                    include: {
                      categories: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const LigneCommand = resultes.LigneCommand.map((ligne) => {
        const prix = ligne.Prix.prix;
        const prixId = ligne.Prix.id;
        const quantiter = ligne.Prix.quantiter;
        const products = { ...ligne.Prix.produits, prix, quantiter, prixId };

        delete ligne.Prix;
        return { ...ligne, products: products };
      });

      const total = LigneCommand?.reduce((acc, el) => {
        return acc + (parseFloat(String(el.products.prix)) || 0);
      }, 0);
      const utilisateur = resultes.utilisateurs;
      delete resultes.utilisateurs;

      const command = { ...resultes, utilisateur, LigneCommand, total };

      return {
        status: 200,
        data: command || {},
      };
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async findByShopId(shopId: number) {
    try {
      const resultes = await this.prisma.commande.findMany({
        where: {
          LigneCommand: {
            some: {
              Prix: {
                boutiqueId: shopId,
              },
            },
          },
        },
        select: {
          id: true,
          commandeNbr: true,
          utilisateurs: {
            select: {
              id: true,
              Adresse: true,
              email: true,
              nom: true,
              prenom: true,
              telephone: true,
            },
          },
          createdAt: true,

          etat: true,
          LigneCommand: {
            include: {
              Prix: {
                include: {
                  produits: {
                    include: {
                      categories: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const command = resultes.map((res) => {
        const LigneCommand = res.LigneCommand.map((ligne) => {
          const prix = ligne.Prix.prix;
          const prixId = ligne.Prix.id;
          const quantiter = ligne.Prix.quantiter;
          const products = { ...ligne.Prix.produits, prix, quantiter, prixId };

          delete ligne.Prix;
          return { ...ligne, products: products };
        });
        const utilisateur = res.utilisateurs;
        delete res.utilisateurs;

        return { ...res, utilisateur, LigneCommand };
      });

      return {
        status: 200,
        data: command || [],
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

      this.prisma.notification.create({
        data: {
          title: 'Création de commande',
          type: 'INFO',
          message: `Nous avons le plaisir de vous confirmer que votre commande est en ${nouvelEtat}. Vous recevrez prochainement un e-mail de confirmation avec les détails de votre commande et les informations de suivi.
              Nous vous remercions pour votre confiance et restons à votre disposition pour toute question supplémentaire.`,
          data: {
            etat: nouvelEtat,
          },
          status: 'UNREAD',
          utilisateur: {
            connect: {
              id: commande.utilisateurId,
            },
          },
        },
      });
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
