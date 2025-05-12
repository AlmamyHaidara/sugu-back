import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateParticulierDto } from './dto/create-particulier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import { UpdateParticulierDto } from './dto/update-particulier.dto';
import { Prisma, ProduitStatus, ProduitType } from '@prisma/client';
import { SearchProduitsDto } from 'src/produit/dto/SearchProduits.dto';
import { Express } from 'express';

@Injectable()
export class ParticulierService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}
  async create(createParticulierDto: CreateParticulierDto) {
    try {
      console.log(createParticulierDto);

      const user = await this.prisma.utilisateur.findUnique({
        where: { id: +createParticulierDto.userId },
        include: { Particular: true },
      });
      // Utiliser une transaction pour garantir l'intégrité des données
      return await this.prisma.$transaction(
        async (tx) => {
          // 1. Vérifier si l'utilisateur existe et n'est pas déjà particulier

          if (!user) {
            throw new Error('Utilisateur non trouvé');
          }

          // 2. Créer un nouveau particulier si n'existe pas déjà
          let particular = user.Particular[0];
          if (!particular) {
            particular = await tx.particular.create({
              data: {
                userId: +user.id,
              },
            });

            this.logger.log(
              `Nouveau particulier créé pour l'utilisateur ${user.id}`,
            );
          }

          // 3. Créer le produit
          const produit = await tx.produit.create({
            data: {
              nom: createParticulierDto.prodName,
              description: createParticulierDto.prodDescription,
              img: createParticulierDto.prodImg,
              categorieId: +createParticulierDto.categorieId,
              isPublic: Boolean(createParticulierDto.published),
              status: ProduitStatus.PENDING,
              type: ProduitType.PARTICULAR,

              // published: Boolean(createParticulierDto.published),
            },
            include: {
              categories: true,
              Prix: {
                select: {
                  id: true,
                  prix: true,
                  quantiter: true,
                },
              },
            },
          });

          this.logger.log(`Nouveau produit créé: ${produit.id}`);

          // 4. Créer le prix associé
          const prix = await tx.prix.create({
            data: {
              prix: +createParticulierDto.prix,
              quantiter: +createParticulierDto.quantiter,
              produitId: +produit.id,
              particularId: +particular.id,
            },
          });

          // 5. Créer une notification pour tous les admins
          const admins = await tx.utilisateur.findMany({
            where: { profile: 'ADMIN' },
          });

          // Créer une notification pour chaque admin
          await tx.notification.createMany({
            data: admins.map((admin) => ({
              utilisateurId: admin.id,
              type: 'INFO',
              title: 'Nouveau produit à valider',
              message: `Nouveau produit publié par ${user.nom} (${user.email}) en attente de validation`,
              status: 'UNREAD',
              data: {
                produitId: +produit.id,
                userId: +user.id,
                particularId: +particular.id,
              },
            })),
          });

          const prixId = prix.id;
          const productFiltered = {
            ...produit,
            ...prix,
            prixId,
            tags: JSON.parse(produit.tags),
          };
          delete productFiltered.Prix;
          return {
            statusCode: HttpStatus.CREATED,
            message: 'Produit créé avec succès',
            data: productFiltered,
          };
        },
        {
          timeout: 10000, // Timeout en millisecondes, ici 10 secondes
        },
      );
    } catch (error) {
      console.log(error);

      this.logger.error(`Erreur lors de la publication: ${error.message}`);
      throw new Error('Erreur lors de la publication du produit');
    }
  }
  async updateProduct(
    updateData: UpdateParticulierDto,
    file?: Express.Multer.File,
  ) {
    try {
      const existingProduit = await this.prisma.produit.findUnique({
        where: { id: Number(updateData.produitId) },
      });

      const existingPrix = await this.prisma.prix.findFirst({
        where: {
          produitId: Number(existingProduit.id),
          particularId: Number(updateData.id),
        },
      });

      if (!existingProduit) {
        throw new NotFoundException(
          `Produit #${updateData.produitId} introuvable.`,
        );
      }

      if (!existingPrix) {
        throw new NotFoundException(
          `Produit #${updateData.produitId} introuvable.`,
        );
      }

      if (file && existingProduit.img) {
        try {
          fs.access(
            'uploads/' + existingProduit.img,
            fs.constants.F_OK,
            (err) => {
              if (err) {
                console.log("Le fichier n'existe pas.");
              } else {
                fs.unlinkSync('uploads/' + existingProduit.img);
              }
            },
          );
        } catch (error) {
          console.error(`Erreur de suppression de l'ancien fichier :`, error);
        }
      }

      const dataToUpdate: any = {
        ...updateData,
      };

      if (file) {
        dataToUpdate.img = file.path.split('uploads/')[1]; // ou construire une URL publique
      }
      const result = await this.prisma.$transaction(
        async (tx) => {
          // 1. Vérifier que le produit existe et appartient au particulier
          const produit = await tx.produit.findFirst({
            where: {
              id: Number(dataToUpdate.produitId),
              Prix: {
                some: {
                  particular: {
                    userId: Number(dataToUpdate.userId),
                  },
                },
              },
            },
            include: {
              Prix: {
                include: {
                  particular: true,
                },
              },
            },
          });

          if (!produit) {
            throw new NotFoundException(
              `Produit #${dataToUpdate.produitId} introuvable.`,
            );
          }

          // 2. Mettre à jour le produit
          const updatedProduit = await tx.produit.update({
            where: { id: Number(dataToUpdate.produitId) },
            data: {
              nom: dataToUpdate.prodName,
              description: dataToUpdate.prodDescription,
              img: dataToUpdate.img,
              categorieId: Number(dataToUpdate.categorieId),
              isPublic: Boolean(dataToUpdate.published),
              // published: false, // Repasse en non public pour nouvelle validation
            },
            include: {
              categories: true,
              Prix: {
                select: {
                  id: true,
                  prix: true,
                  quantiter: true,
                  particular: true,
                  particularId: true,
                },
              },
            },
          });
          let updatedPrix = updatedProduit.Prix[0];
          // 3. Mettre à jour le prix si nécessaire
          if (dataToUpdate.prix || dataToUpdate.quantiter) {
            updatedPrix = await tx.prix.update({
              where: { id: Number(produit.Prix[0].id) },
              data: {
                prix: Number(dataToUpdate.prix),
                quantiter: Number(dataToUpdate.quantiter),
              },
              select: {
                id: true,
                prix: true,
                quantiter: true,
                particular: true,
                particularId: true,
              },
            });
          }

          // 4. Notifier les admins de la modification
          const admins = await tx.utilisateur.findMany({
            where: { profile: 'ADMIN' },
          });

          await tx.notification.createMany({
            data: admins.map((admin) => ({
              utilisateurId: Number(admin.id),
              type: 'INFO',
              title: 'Produit modifié à valider',
              message: `Un produit a été modifié et nécessite une nouvelle validation`,
              status: 'UNREAD',
              data: {
                produitId: Number(produit.id),
                userId: Number(dataToUpdate.userId),
                particularId: Number(produit.Prix[0].particular.id),
              },
            })),
          });

          this.logger.log(
            `Produit ${dataToUpdate.produitId} modifié par utilisateur ${dataToUpdate.userId}`,
          );

          const prixId = updatedPrix.id;
          delete dataToUpdate.Prix;
          const productFiltered = {
            ...dataToUpdate,
            published: Boolean(dataToUpdate.published),
            ...updatedPrix,

            prixId,
          };
          delete productFiltered.Prix;

          return {
            statusCode: HttpStatus.OK,
            message: 'Produit modifié avec succès',
            data: productFiltered,
          };
        },
        {
          timeout: 15000, // Timeout en millisecondes, ici 15 secondes
        },
      );

      return result;
    } catch (error) {
      console.error(error);

      this.logger.error(`Erreur lors de la modification: ${error.message}`);
      throw new Error('Erreur lors de la modification du produit');
    }
  }

  async deleteProduct(userId: number, produitId: number) {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        console.log('deleteProduct', userId, {
          where: {
            id: produitId,
            Prix: {
              some: {
                particular: {
                  userId: userId,
                },
              },
            },
          },
          include: {
            Prix: {
              include: {
                particular: true,
              },
            },
          },
        });
        // 1. Vérifier que le produit existe et appartient au particulier
        const produit = await tx.produit.findFirst({
          where: {
            id: produitId,
            Prix: {
              some: {
                particular: {
                  userId: userId,
                },
              },
            },
          },
          include: {
            Prix: {
              include: {
                particular: true,
              },
            },
          },
        });
        if (!produit) {
          throw new NotFoundException(`Produit #${produitId} introuvable.`);
        }

        // 2. Supprimer le produit (la suppression en cascade s'occupera des prix)
        await tx.produit.delete({
          where: { id: produitId },
        });

        this.logger.log(
          `Produit ${produitId} supprimé par utilisateur ${userId}`,
        );

        return { message: 'Produit supprimé avec succès' };
      });
      return result;
    } catch (error) {
      console.error(error);

      this.logger.error(`Erreur lors de la suppression: ${error.message}`);
      throw new InternalServerErrorException(
        `Erreur lors de la suppression du produit`,
      );
    }
  }

  async findAllProducts(userId: number) {
    try {
      const products = await this.prisma.produit.findMany({
        where: {
          Prix: {
            some: {
              particular: {
                userId: userId,
              },
            },
          },
        },
        include: {
          Prix: {
            select: {
              id: true,
              prix: true,
              quantiter: true,
              boutiqueId: true,
              particularId: true,
            },
          },
          // categories: true,
        },
      });

      const result = products.map((element) => {
        const firstPrix = element.Prix[0];
        const { ...rest } = element;
        return {
          ...rest,
          published: element.isPublic,
          prix: firstPrix.prix,
          prixId: firstPrix.id,
          quantiter: firstPrix.quantiter,
          particularId: firstPrix.particularId,
        };
      });

      return {
        statusCode: HttpStatus.OK,
        message: `Liste des produits de la boutique #${userId}`,
        data: result,
      };
    } catch (error) {
      console.error(error);

      this.logger.error(
        `Erreur lors de la récupération des produits: ${error.message}`,
      );
      throw new Error('Erreur lors de la récupération des produits');
    }
  }

  async findAllProduitsInValidation() {
    try {
      const produits = await this.prisma.produit.findMany({
        where: {
          NOT: {
            status: ProduitStatus.REJECTED,
          },
          isPublic: true,
        },
        include: {
          Prix: {
            include: {
              particular: true,
              LigneCommand: {
                include: {
                  Commande: true,
                },
              },
            },
          },
          categories: true,
        },
      });

      const result = produits.map((el) => {
        const custum = {
          ...el,
          published: el.isPublic,
          prix: el.Prix[0].prix,
          prixId: el.Prix[0].id,
          quantiter: el.Prix[0].quantiter,
          particularId: el.Prix[0].particularId,
          particulier: el.Prix[0].particular,
        };
        delete custum.Prix;
        return custum;
      });

      return {
        statusCode: HttpStatus.OK,
        message: `Produits en attente de validation`,
        data: result,
      };
    } catch (error) {
      console.error(error);

      this.logger.error(
        `Erreur lors de la récupération des produits en attente de validation: ${error.message}`,
      );
      throw new Error(
        'Erreur lors de la récupération des produits en attente de validation',
      );
    }
  }

  async validateProduct(
    produitId: number,
    status: ProduitStatus,
    comment?: string,
  ) {
    try {
      const produit = await this.prisma.produit.findUnique({
        where: {
          id: produitId,
        },
        include: {
          Prix: {
            include: {
              particular: true,
            },
          },
        },
      });
      if (!produit) {
        throw new NotFoundException(`Produit #${produitId} introuvable.`);
      }
      await this.prisma.produit.update({
        where: { id: produitId },
        data: { status },
      });

      if (status === ProduitStatus.APPROVED) {
        await this.prisma.produitValidationLog.create({
          data: {
            produitId,
            adminId: 1,
            action: status,
          },
        });
        await this.prisma.notification.create({
          data: {
            utilisateurId: produit.Prix[0].particularId,
            type: 'INFO',
            title: 'Produit validé',
            message: `Votre produit a été validé`,
            status: 'UNREAD',
            data: {
              produitId,
              userId: produit.Prix[0].particular.userId,
              particularId: produit.Prix[0].particularId,
            },
          },
        });
        return {
          statusCode: HttpStatus.OK,
          message: `Produit #${produitId} validé avec succès`,
        };
      } else if (status === ProduitStatus.REJECTED) {
        await this.prisma.produitValidationLog.create({
          data: {
            produitId,
            adminId: 1,
            action: status,
            comment: comment,
          },
        });
        await this.prisma.notification.create({
          data: {
            utilisateurId: produit.Prix[0].particularId,
            type: 'INFO',
            title: 'Produit rejeté',
            message: comment || 'Votre produit a été rejeté',
            status: 'UNREAD',
            data: {
              produitId,
              userId: produit.Prix[0].particular.userId,
              particularId: produit.Prix[0].particularId,
            },
          },
        });
        return {
          statusCode: HttpStatus.OK,
          message: `Produit #${produitId} rejeté avec succès`,
        };
      }
    } catch (error) {
      console.error(error);

      this.logger.error(
        `Erreur lors de la validation du produit: ${error.message}`,
      );
      throw new Error('Erreur lors de la validation du produit');
    }
  }

  async revalidateProduct(produitId: number) {
    try {
      const produit = await this.prisma.produit.findUnique({
        where: { id: produitId },
        include: {
          Prix: {
            include: {
              particular: true,
            },
          },
        },
      });
      if (!produit) {
        throw new NotFoundException(`Produit #${produitId} introuvable.`);
      }
      await this.prisma.produit.update({
        where: { id: produitId },
        data: { status: ProduitStatus.PENDING },
      });
      await this.prisma.notification.create({
        data: {
          utilisateurId: produit.Prix[0].particularId,
          type: 'INFO',
          title: 'Produit révalidé',
          message: `Votre produit a été remis en attente de validation`,
          status: 'UNREAD',
          data: {
            produitId,
            userId: produit.Prix[0].particular.userId,
            particularId: produit.Prix[0].particularId,
          },
        },
      });
      return {
        statusCode: HttpStatus.OK,
        message: `Produit #${produitId} révalidé avec succès`,
      };
    } catch (error) {
      console.error(error);

      this.logger.error(
        `Erreur lors de la révalidation du produit: ${error.message}`,
      );
      throw new Error('Erreur lors de la révalidation du produit');
    }
  }
  async findProductById(userId: number, productId: number) {
    try {
      const product = await this.prisma.produit.findFirst({
        where: {
          id: productId,
          Prix: {
            some: {
              particular: {
                userId: userId,
              },
            },
          },
        },
        include: {
          Prix: {
            include: {
              particular: true,
              LigneCommand: {
                include: {
                  Commande: true,
                },
              },
            },
          },
          categories: true,
        },
      });

      if (!product) {
        throw new Error('Produit non trouvé ou non autorisé');
      }
      const result = product.Prix.map((el) => {
        const custum = {
          ...product,
          published: product.isPublic,
          prix: el.prix,
          prixId: el.id,
          quantiter: el.quantiter,
          particularId: el.particularId,
          particulier: el.particular,
        };
        delete custum.Prix;
        return custum;
      });

      return {
        statusCode: HttpStatus.OK,
        message: `Produit #${productId} de la boutique #${userId}`,
        data: result,
      };
    } catch (error) {
      console.error(error);

      this.logger.error(
        `Erreur lors de la récupération du produit: ${error.message}`,
      );
      throw new Error('Erreur lors de la récupération du produit');
    }
  }

  async findAllApprovedProducts(query: SearchProduitsDto) {
    const {
      nom,
      categorieBoutique,
      categorieId,
      prixMin,
      prixMax,
      page,
      limit,
    } = query;

    // Construction de l'objet where
    const whereClause: Prisma.ProduitWhereInput = {};

    // Filtre par nom
    if (nom) {
      whereClause.nom = { contains: nom };
      // whereClause.nom = { contains: nom, mode: 'insensitive' };
    }

    // Filtre par catégorie
    if (categorieId) {
      whereClause.categorieId = Number(categorieId);
    }

    // Préparation du filtre sur Prix pour gérer le prix + location
    const prixFilter: Prisma.PrixWhereInput = {};

    if (prixMin || prixMax) {
      prixFilter.prix = {
        gte: prixMin ? Number(prixMin) : undefined,
        lte: prixMax ? Number(prixMax) : undefined,
      };
    }

    // Si on a des filtres sur Prix, on les applique avec "some"
    if (Object.keys(prixFilter).length > 0) {
      whereClause.Prix = {
        some: prixFilter,
      };
    }

    // Pagination
    const pageNumber = page ? Number(page) : 1;
    const pageSize = limit ? Number(limit) : 60;
    const skip = (pageNumber - 1) * pageSize;

    try {
      // Récupération du count total + des produits
      const [totalCount, produits] = await Promise.all([
        this.prisma.produit.count({ where: whereClause }),
        this.prisma.produit.findMany({
          where: {
            ...whereClause,
            status: ProduitStatus.APPROVED,
            type: ProduitType.PARTICULAR,
          },
          skip,
          take: pageSize,
          include: {
            categories: true,
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
        }),
      ]);

      const products = produits.filter((item) => {
        // Vérification si l'article a des prix
        if (item.Prix.length > 0) {
          // Si une catégorie boutique est fournie, filtrer les prix associés à cette catégorie
          if (categorieBoutique) {
            // Si au moins un prix correspond à la catégorie de la boutique, on inclut ce produit
            return item.Prix.some((prix) => prix.particularId);
          } else {
            // Si aucune catégorie boutique n'est spécifiée, on inclut tous les produits avec des prix
            return true;
          }
        }

        // Si l'article n'a pas de prix, il est exclu
        return false;
      });

      const dataFiltered = products.map((res) => {
        const filter = res.Prix.map((prix) => {
          return {
            prix: prix.prix,
            quantiter: prix.quantiter,
            particulier: {
              id: prix.particular.id,
              nom: prix.particular.utilisateur.nom,
              prenom: prix.particular.utilisateur.prenom,
              phone: prix.particular.utilisateur.telephone,
              email: prix.particular.utilisateur.email,
            },
          };
        });

        return filter.map((el) => {
          const categorie = res?.categories?.nom;
          delete res.Prix;
          delete res.categories;
          return {
            ...res,
            categorie,
            prix: el.prix,
            quantiter: el.quantiter,
            particulier: el.particulier,
          };
        })[0];
      });
      console.log(dataFiltered.length);

      return {
        statusCode: HttpStatus.OK,
        message: 'Liste des produits filtrés',
        data: dataFiltered,
        totalCount,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCount / pageSize),
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erreur lors de la recherche des produits',
      );
    }
  }
}
