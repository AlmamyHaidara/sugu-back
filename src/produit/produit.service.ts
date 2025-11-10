import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { SearchProduitsDto } from './dto/SearchProduits.dto';
import {
  CategorieBoutique,
  Image,
  Prisma,
  ProduitStatus,
  ProduitType,
} from '@prisma/client';
import { Location } from 'src/boutique/dto/create-boutique.dto';
import * as fs from 'fs';
import { Express } from 'express';

@Injectable()
export class ProduitService {
  constructor(private readonly prisma: PrismaService) {}

  // ========== CREATE ==========
  async create(createProduitDto: CreateProduitDto) {
    try {
      // Vérifier l'existence de la catégorie
      const categorie = await this.prisma.categorieProduit.findUnique({
        where: { id: Number(createProduitDto.categorie) },
      });
      if (!categorie) {
        throw new NotFoundException('Catégorie inexistante');
      }

      // (Facultatif) vérifier l'existence de la boutique référencée
      const boutiqueId = Number(createProduitDto.boutique);
      const boutique = await this.prisma.boutique.findUnique({
        where: { id: boutiqueId },
      });
      if (!boutique) {
        throw new NotFoundException(
          `Boutique #${createProduitDto.boutique} introuvable`,
        );
      }

      // Création du produit avec son prix associé
      const produit = await this.prisma.produit.create({
        data: {
          nom: createProduitDto.nom,
          description: createProduitDto.description,
          img: '',
          tags: createProduitDto.tags,
          isPublic: true,
          status: ProduitStatus.APPROVED,

          // tags: JSON.parse(createProduitDto.tags),
          categories: {
            connect: { id: Number(createProduitDto.categorie) },
          },
          Prix: {
            create: {
              prix: createProduitDto.prix,
              quantiter: Number(createProduitDto.quantiter),
              boutiques: {
                connect: { id: boutiqueId },
              },
            },
          },
        },
        include: {
          categories: true,
          Image: true,
          Prix: {
            select: {
              id: true,
              prix: true,
              quantiter: true,
            },
          },
        },
      });

      const images = createProduitDto.imgs.map((img) => {
        return { img, produitId: produit.id };
      });
      const imageSaved = await this.prisma.image.createMany({
        data: images,
      });
      const prd = await this.prisma.produit.findFirst({
        where: {
          id: produit.id,
        },
        include: {
          categories: true,
          Image: true,
          Prix: {
            select: {
              id: true,
              prix: true,
              quantiter: true,
            },
          },
        },
      });
      const prixId = prd.Prix[0].id;
      delete prd.Prix[0].id;
      const productFiltered = {
        ...prd,
        ...prd.Prix[0],
        prixId,
        // img: imageSaved,
      };
      delete productFiltered.Prix;
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Produit créé avec succès',
        data: productFiltered,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la création du produit.',
      );
    }
  }

  // ========== CREATE ==========
  async createParticular(createProduitDto: CreateProduitDto) {
    try {
      // Vérifier l'existence de la catégorie
      const categorie = await this.prisma.categorieProduit.findUnique({
        where: { id: Number(createProduitDto.categorie) },
      });
      if (!categorie) {
        throw new NotFoundException('Catégorie inexistante');
      }

      // (Facultatif) vérifier l'existence de la boutique référencée
      const boutiqueId = Number(createProduitDto.boutique);
      const boutique = await this.prisma.boutique.findUnique({
        where: { id: boutiqueId },
      });
      if (!boutique) {
        throw new NotFoundException(
          `Boutique #${createProduitDto.boutique} introuvable`,
        );
      }

      // Création du produit avec son prix associé
      const produit = await this.prisma.produit.create({
        data: {
          nom: createProduitDto.nom,
          description: createProduitDto.description,
          // img: createProduitDto.img,
          tags: createProduitDto.tags,
          status: ProduitStatus.PENDING,

          // tags: JSON.parse(createProduitDto.tags),
          categories: {
            connect: { id: Number(createProduitDto.categorie) },
          },
          Prix: {
            create: {
              prix: createProduitDto.prix,
              quantiter: Number(createProduitDto.quantiter),
              boutiques: {
                connect: { id: boutiqueId },
              },
            },
          },
        },
        include: {
          categories: true,
          Image: true,
          Prix: {
            select: {
              id: true,
              prix: true,
              quantiter: true,
            },
          },
        },
      });

      const images = createProduitDto.imgs.map((img) => {
        return { img, produitId: produit.id };
      });
      const imageSaved = await this.prisma.image.createMany({
        data: images,
      });

      const prixId = produit.Prix[0].id;
      delete produit.Prix[0].id;
      const productFiltered = {
        ...produit,
        ...produit.Prix[0],
        prixId,
        img: imageSaved,
      };
      delete productFiltered.Prix;
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Produit créé avec succès',
        data: productFiltered,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la création du produit.',
      );
    }
  }

  async createA(createProduitDto: CreateProduitDto) {
    try {
      // Vérifier l'existence de la catégorie
      const categorie = await this.prisma.categorieProduit.findUnique({
        where: { id: Number(createProduitDto.categorie) },
      });
      if (!categorie) {
        throw new NotFoundException('Catégorie inexistante');
      }

      // (Facultatif) vérifier l'existence de la boutique référencée
      const boutiqueId = Number(createProduitDto.boutique);
      console.log('boutiqueIdboutiqueIdboutiqueIdboutiqueId');
      console.log(boutiqueId);
      const boutique = await this.prisma.boutique.findFirst({
        where: { userId: boutiqueId },
      });
      if (!boutique) {
        throw new NotFoundException(
          `Boutique #${createProduitDto.boutique} introuvable`,
        );
      }

      // Création du produit avec son prix associé
      const produit = await this.prisma.produit.create({
        data: {
          nom: createProduitDto.nom,
          description: createProduitDto.description,
          // img: createProduitDto.img,
          tags: createProduitDto.tags,
          status: ProduitStatus.APPROVED,
          isPublic: true,

          // tags: JSON.parse(createProduitDto.tags),
          categories: {
            connect: { id: Number(createProduitDto.categorie) },
          },
          Prix: {
            create: {
              prix: createProduitDto.prix,
              quantiter: Number(createProduitDto.quantiter),
              boutiques: {
                connect: { id: boutique.id },
              },
            },
          },
        },
        include: {
          categories: true,
          Image: true,
          Prix: {
            select: {
              id: true,
              prix: true,
              quantiter: true,
            },
          },
        },
      });

      const images = createProduitDto.imgs.map((img) => {
        return { img, produitId: produit.id };
      });
      const imageSaved = await this.prisma.image.createMany({
        data: images,
      });

      const prixId = produit.Prix[0].id;
      delete produit.Prix[0].id;
      const productFiltered = {
        ...produit,
        ...produit.Prix[0],
        prixId,
        tags: JSON.parse(produit.tags),
        img: imageSaved,
      };
      delete productFiltered.Prix;
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Produit créé avec succès',
        data: productFiltered,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la création du produit.',
      );
    }
  }

  // ========== FIND ALL ==========
  async findAll() {
    try {
      const produits = await this.prisma.produit.findMany({
        where: {
          status: ProduitStatus.APPROVED,
          isPublic: true,
        },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Liste de tous les produits',
        data: produits,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erreur lors de la récupération des produits',
      );
    }
  }

  // ========== FIND ALL BY SHOP ==========
  async findAllByShop(shopId: number, userId?: number) {
    try {
      // (Facultatif) Vérifier l'existence de la boutique
      const shopExists = await this.prisma.boutique.findUnique({
        where: { id: shopId },
      });
      if (!shopExists) {
        throw new NotFoundException(`Boutique #${shopId} introuvable.`);
      }

      const produits = await this.prisma.produit.findMany({
        where: {
          Prix: {
            some: {
              boutiqueId: shopId,

              quantiter: {
                gt: 0,
              },
            },
          },
        },
        include: {
          Favorie: {
            where: {
              userId: userId,
            },
          },
          Image: true,
          categories: true,
          Prix: {
            // select: {
            //   id: true,
            //   prix: true,
            //   quantiter: true,
            //   boutiqueId: true,
            //   produitId: true,
            // },
            omit: {
              createdAt: true,
              updatedAt: true,
              particularId: true,
            },
            include: {
              boutiques: {
                select: {
                  id: true,
                  nom: true,
                  location: true,
                  phone: true,
                  categorie: true,
                },
              },
            },
          },
        },
      });

      // Exemple : vous fusionnez le premier Prix dans l'objet produit
      // Attention si un produit a plusieurs prix, vous n'en gardez qu'un seul ici.
      const result = produits.map((element) => {
        const firstPrix = element.Prix[0];
        const { Prix, ...rest } = element;
        return { ...rest, ...firstPrix };
      });

      return {
        statusCode: HttpStatus.OK,
        message: `Liste des produits de la boutique #${shopId}`,
        data: result,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erreur lors de la récupération des produits de la boutique',
      );
    }
  }

  // ========== FIND ONE ==========
  async findOne(id: number) {
    try {
      const produit = await this.prisma.produit.findUnique({
        where: { id: Number(id) },
      });
      if (!produit) {
        throw new NotFoundException(`Produit #${id} introuvable.`);
      }
      return {
        statusCode: HttpStatus.OK,
        message: `Détails du produit #${id}`,
        data: produit,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erreur lors de la récupération du produit',
      );
    }
  }

  async findByShopId(shopId: number, userId?: number) {
    try {
      const prixs = await this.prisma.prix.findMany({
        where: {
          boutiqueId: shopId,
        },
        include: {
          produits: {
            select: {
              id: true,
              categorieId: true,
              description: true,
              nom: true,
              tags: true,
              categories: true,
              Favorie: {
                where: {
                  userId: userId,
                },
              },
              Image: true,
            },
          },
        },
      });

      const products = prixs.flatMap((prix) => {
        const prixId = prix.id;
        const products = {
          ...prix.produits,
          tags: JSON.parse(prix.produits.tags),
        };
        delete prix.boutiqueId;
        delete prix.produitId;
        delete prix.produits;
        return { ...prix, prixId, ...{ ...products, imgs: products.Image } };
      });

      return {
        statusCode: HttpStatus.OK,
        message: `La liste des produits`,
        data: products,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erreur lors de la récupération du produit',
      );
    }
  }

  async findByUserIdAndShopId(shopId: number, userId: number) {
    try {
      const prixs = await this.prisma.prix.findMany({
        where: {
          boutiqueId: shopId,
          boutiques: {
            userId: userId,
          },
        },
        include: {
          produits: {
            // select: {
            //   id: true,
            //   categorieId: true,
            //   description: true,
            //   img: true,
            //   Image: true,
            //   nom: true,
            //   tags: true,
            //   categories: true,
            //   Favorie: {
            //     where: {
            //       userId: userId,
            //     },
            //   },

            // },
            include: {
              categories: true,
              Favorie: {
                where: {
                  userId: userId,
                },
              },
              Image: true,
            },
          },
        },
      });

      const products = prixs.flatMap((prix) => {
        const prixId = prix.id;
        const products = prix.produits;
        delete prix.boutiqueId;
        delete prix.produitId;
        delete prix.produits;
        return { ...prix, prixId, ...{ ...products, imgs: products.Image } };
      });

      return {
        statusCode: HttpStatus.OK,
        message: `La liste des produits`,
        data: products,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erreur lors de la récupération du produit',
      );
    }
  }

  // ========== UPDATE ==========
  async update(
    id: number,
    updateProduitDto: UpdateProduitDto,
    file?: Express.Multer.File[],
  ) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Récupérer le produit et son prix
      const produit = await tx.produit.findUnique({
        where: { id: Number(id) },
        include: { Image: true },
      });

      if (!produit) {
        throw new NotFoundException(`Produit #${id} introuvable.`);
      }

      const prix = await tx.prix.findFirst({
        where: {
          produitId: Number(id),
          boutiqueId: Number(updateProduitDto.boutique),
        },
      });

      if (!prix) {
        throw new NotFoundException(
          `Prix pour le produit #${id} dans la boutique #${updateProduitDto.boutique} introuvable.`,
        );
      }

      // 2. Gérer les images
      if (file && file.length > 0) {
        // Supprimer les anciennes images (fichiers et BDD)
        if (produit.Image.length > 0) {
          produit.Image.forEach((image) => {
            try {
              const filePath = `uploads/${image.img}`;
              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
              }
            } catch (error) {
              console.error(
                `Erreur de suppression de l'ancien fichier : ${image.img}`,
                error,
              );
            }
          });
          await tx.image.deleteMany({ where: { produitId: Number(id) } });
        }

        // Ajouter les nouvelles images
        const newImages = file.map((f) => ({
          img: f.path.split('uploads/')[1] || f.path.split('uploads\\')[1],
          produitId: Number(id),
        }));
        await tx.image.createMany({ data: newImages });
      }

      // 3. Mettre à jour le produit
      const updatedProduit = await tx.produit.update({
        where: { id: Number(id) },
        data: {
          nom: updateProduitDto.nom,
          description: updateProduitDto.description,
          tags: updateProduitDto.tags,
          categorieId: Number(updateProduitDto.categorie),
        },
      });

      // 4. Mettre à jour le prix
      const updatedPrix = await tx.prix.update({
        where: { id: prix.id },
        data: {
          prix: updateProduitDto.prix,
          quantiter: Number(updateProduitDto.quantiter),
        },
      });

      // 5. Récupérer le produit mis à jour avec toutes ses relations
      const finalProduit = await tx.produit.findUnique({
        where: { id: Number(id) },
        include: {
          categories: true,
          Image: true,
          Favorie: true,
          Prix: { where: { id: updatedPrix.id } },
        },
      });

      const productFiltered = {
        ...finalProduit,
        prix: finalProduit.Prix[0].prix,
        quantiter: finalProduit.Prix[0].quantiter,
        prixId: finalProduit.Prix[0].id,
      };
      delete productFiltered.Prix;

      return {
        statusCode: HttpStatus.OK,
        message: `Produit #${id} mis à jour avec succès`,
        data: productFiltered,
      };
    });
  }

  // ========== REMOVE ==========
  async remove(id: number) {
    try {
      const existingProduit = await this.prisma.produit.findUnique({
        where: { id: Number(id) },
      });
      if (!existingProduit) {
        throw new NotFoundException(`Produit #${id} introuvable.`);
      }

      if (existingProduit.img) {
        try {
          fs.access(existingProduit.img, fs.constants.F_OK, (err) => {
            if (err) {
              console.log("Le fichier n'existe pas.");
            } else {
              fs.unlinkSync('uploads/' + existingProduit.img);
            }
          });
        } catch (error) {
          console.error(`Erreur de suppression de l'image :`, error);
          // vous pouvez ignorer ou lever une exception selon votre logique
        }
      }

      // (Facultatif) Si vous stockez l'image localement, supprimez le fichier ici
      // fs.unlinkSync(existingProduit.img) si le champ img est un path local.

      await this.prisma.produit.deleteMany({
        where: { id: Number(id) },
      });

      return {
        statusCode: HttpStatus.OK,
        message: `Le produit #${id} a été supprimé avec succès`,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erreur lors de la suppression du produit',
      );
    }
  }

  async findAllProduitsByCountryId(countryId: number, userId?: number) {
    const existingContry = await this.prisma.country.findUnique({
      where: { id: Number(countryId) },
    });
    if (!existingContry) {
      throw new NotFoundException(`Pays #${countryId} introuvable.`);
    }
    const produits = await this.prisma.produit.findMany({
      where: {
        Prix: {
          some: {
            boutiques: {
              countryId: countryId,
            },
            quantiter: {
              gt: 0,
            },
          },
        },
      },
      include: {
        categories: true,
        Image: true,
        Favorie: {
          where: {
            userId: userId,
          },
        },
        Prix: {
          include: {
            boutiques: true,
          },
        },
      },
    });

    const products = produits.filter((item) => {
      // Vérification si l'article a des prix
      if (item.Prix.length > 0) {
        // Si une catégorie boutique est fournie, filtrer les prix associés à cette catégorie
        return item;
      }
    });

    const dataFiltered = products.map((res) => {
      const filter = res.Prix.map((prix) => {
        return {
          prix: prix.prix,
          quantiter: prix.quantiter,
          boutique: {
            id: prix.boutiques.id,
            nom: prix.boutiques.nom,
            location: prix.boutiques.location,
            phone: prix.boutiques.phone,
            categorie: prix.boutiques.categorie,
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
          boutique: el.boutique,
        };
      })[0];
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Liste des produits',
      data: dataFiltered,
    };
  }

  // ========== RECHERCHE / PAGINATION ==========
  async findAllProduits(query: SearchProduitsDto, userId?: number) {
    const {
      nom,
      categorieBoutique,
      categorieId,
      prixMin,
      prixMax,
      countryId,
      location,
      page,
      limit,
    } = query;

    // Construction de l'objet where
    const whereClause: Prisma.ProduitWhereInput = {};
    const whereBoutiqueClause: Prisma.BoutiqueWhereInput = {};

    // Filtre par nom
    if (nom) {
      whereClause.nom = { contains: nom };
      // whereClause.nom = { contains: nom, mode: 'insensitive' };
    }

    // Filtre par catégorie
    if (categorieId) {
      whereClause.categorieId = Number(categorieId);
    }

    if (categorieBoutique) {
      whereBoutiqueClause.categorie = categorieBoutique as CategorieBoutique;
    }

    // Préparation du filtre sur Prix pour gérer le prix + location
    const prixFilter: Prisma.PrixWhereInput = {};

    if (prixMin || prixMax) {
      prixFilter.prix = {
        gte: prixMin ? Number(prixMin) : undefined,
        lte: prixMax ? Number(prixMax) : undefined,
      };
    }

    if (countryId || location) {
      prixFilter.boutiques = {
        countryId: countryId ? Number(countryId) : undefined,
        location: (location ? location : undefined) as Location,
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
            type: ProduitType.BOUTIQUE,
          },
          skip,
          take: pageSize,
          include: {
            categories: true,
            Image: true,
            Prix: {
              include: {
                boutiques: true,
              },
            },
            Favorie: {
              where: {
                userId: userId,
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
            return item.Prix.some(
              (prix) => prix.boutiques.categorie === categorieBoutique,
            );
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
            boutique: {
              id: prix.boutiques.id,
              nom: prix.boutiques.nom,
              location: prix.boutiques.location,
              phone: prix.boutiques.phone,
              categorie: prix.boutiques.categorie,
            },
          };
        });

        return filter.map((el) => {
          const categorie = res?.categories?.nom;
          delete res.Prix;
          delete res.categories;
          return {
            ...res,
            imgs: res.Image,
            categorie,
            prix: el.prix,
            boutique: el.boutique,
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
