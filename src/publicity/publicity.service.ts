import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicityDto } from './dto/create-publicity.dto';
import { UpdatePublicityDto } from './dto/update-publicity.dto';
import { PrismaService } from 'src/prisma/prisma.service copy';
import * as fs from 'fs';
import { Express } from 'express';

@Injectable()
export class PublicityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(createPublicityDto: CreatePublicityDto) {
    try {
      const result = await this.prisma.offreSpeciale.create({
        data: {
          titre: createPublicityDto.titre,
          description: createPublicityDto.description,
          pourcentage: Number(createPublicityDto.pourcentage),
          dateFin: createPublicityDto.dateFin,
          dateDebut: createPublicityDto.dateDebut,
          img: createPublicityDto.img,
        },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Publicité créée avec succès',
        data: result,
      };
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException(
        'Erreur lors de la création de la publicité',
      );
    }
  }

  approved(createPublicityDto: CreatePublicityDto) {
    return 'This action adds a new publicity';
  }

  async validateProduct(
    adminId: number,
    produitId: number,
    isApproved: boolean,
    comment?: string,
  ) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // 1. Vérifier que l'admin existe
        const admin = await tx.utilisateur.findFirst({
          where: {
            id: adminId,
            profile: 'ADMIN',
          },
        });

        if (!admin) {
          throw new Error('Administrateur non autorisé');
        }

        // 2. Récupérer le produit et ses informations associées
        const produit = await tx.produit.findUnique({
          where: { id: produitId },
          include: {
            Prix: {
              include: {
                particular: {
                  include: {
                    utilisateur: true,
                  },
                },
              },
            },
          },
        });

        if (!produit) {
          throw new Error('Produit non trouvé');
        }

        // 3. Mettre à jour le statut du produit
        const updatedProduit = await tx.produit.update({
          where: { id: produitId },
          data: {
            isPublic: isApproved,
            updatedAt: new Date(),
          },
        });

        // 4. Créer une notification pour le particulier
        const utilisateurId = produit.Prix[0]?.particular?.utilisateur?.id;
        if (utilisateurId) {
          await tx.notification.create({
            data: {
              utilisateurId: utilisateurId,
              type: isApproved ? 'INFO' : 'WARNING',
              title: isApproved ? 'Produit approuvé' : 'Produit refusé',
              message: isApproved
                ? `Votre produit "${produit.nom}" a été approuvé et est maintenant public`
                : `Votre produit "${produit.nom}" a été refusé. ${comment || ''}`,
              status: 'UNREAD',
              data: {
                produitId: produit.id,
                adminId: admin.id,
                decision: isApproved ? 'APPROVED' : 'REJECTED',
                comment,
              },
            },
          });
        }

        this.logger.log(
          `Produit ${produitId} ${isApproved ? 'approuvé' : 'refusé'} par admin ${adminId}`,
        );

        return updatedProduit;
      });
    } catch (error) {
      console.error(error);

      this.logger.error(`Erreur lors de la validation: ${error.message}`);
      throw new Error('Erreur lors de la validation du produit');
    }
  }

  findAll() {
    return this.prisma.offreSpeciale.findMany();
  }
  findAllEnabke() {
    return this.prisma.offreSpeciale.findMany({
      where: {},
    });
  }

  findAllByDate() {
    return this.prisma.offreSpeciale.findMany({
      where: { dateFin: { lte: new Date() } },
    });
  }
  findOne(id: number) {
    return this.prisma.offreSpeciale.findUnique({
      where: { id },
    });
  }

  findOneByDate(date: Date) {
    return this.prisma.offreSpeciale.findFirst({
      where: { dateDebut: { lte: date }, dateFin: { gte: date } },
    });
  }

  async update(
    id: number,
    updatePublicityDto: UpdatePublicityDto,
    file?: Express.Multer.File,
  ) {
    try {
      const isExiste = await this.prisma.offreSpeciale.findFirst({
        where: { id },
      });
      if (!isExiste) {
        throw new NotFoundException(`Offre #${id} introuvable.`);
      }
      if (file && isExiste.img) {
        try {
          fs.access('uploads/' + isExiste.img, fs.constants.F_OK, (err) => {
            if (err) {
              console.log("Le fichier n'existe pas.");
            } else {
              fs.unlinkSync('uploads/' + isExiste.img);
            }
          });
        } catch (error) {
          console.error(`Erreur de suppression de l'ancien fichier :`, error);
        }
      }

      // 3. Préparer les données à mettre à jour
      const dataToUpdate: any = {
        ...updatePublicityDto,
      };

      // 4. Si on a un nouveau fichier, mettre à jour le champ img
      if (file) {
        dataToUpdate.img = file.path.split('uploads/')[1]; // ou construire une URL publique
      }
      delete dataToUpdate.id;
      return await this.prisma.offreSpeciale.update({
        where: { id: Number(id) },
        data: {
          ...dataToUpdate,
          pourcentage: Number(dataToUpdate.pourcentage),
        },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        "Erreur lors de la mise à jour de l'offe",
      );
    }
  }

  remove(id: number) {
    return this.prisma.offreSpeciale.delete({
      where: { id },
    });
  }
}
