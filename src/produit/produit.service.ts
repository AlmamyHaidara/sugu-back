import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { SearchProduitsDto } from './dto/SearchProduits.dto';
import { Prisma } from '@prisma/client';
import { Location } from 'src/boutique/dto/create-boutique.dto';
import fs from 'fs';
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
      console.log(JSON.parse(createProduitDto.tags));

      // Création du produit avec son prix associé
      const produit = await this.prisma.produit.create({
        data: {
          nom: createProduitDto.nom,
          description: createProduitDto.description,
          img: createProduitDto.img,
          tags: JSON.parse(createProduitDto.tags),
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
          Prix: true,
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Produit créé avec succès',
        data: produit,
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
      const produits = await this.prisma.produit.findMany();
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
  async findAllByShop(shopId: number) {
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
              produitId: true,
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

  // ========== UPDATE ==========
  async update(
    id: number,
    updateProduitDto: UpdateProduitDto,
    file?: Express.Multer.File,
  ) {
    try {
      const existingProduit = await this.prisma.produit.findUnique({
        where: { id: Number(id) },
      });

      const existingPrix = await this.prisma.prix.findFirst({
        where: {
          produitId: Number(existingProduit.id),
          boutiqueId: Number(updateProduitDto.boutique),
        },
      });

      if (!existingProduit) {
        throw new NotFoundException(`Produit #${id} introuvable.`);
      }

      if (!existingPrix) {
        throw new NotFoundException(`Produit #${id} introuvable.`);
      }

      if (file && existingProduit.img) {
        // fs.unlinkSync ou fs/promises.unlink (avec try/catch)
        try {
          // Supprimez l'ancien fichier du disque
          // Attention : vérifiez que existingProduit.img est un path (et pas une URL externe)
          fs.unlinkSync(existingProduit.img);
        } catch (error) {
          console.error(`Erreur de suppression de l'ancien fichier :`, error);
          // Vous pouvez ignorer l'erreur ou lever une exception, selon votre logique
        }
      }

      // 3. Préparer les données à mettre à jour
      const dataToUpdate: any = {
        ...updateProduitDto,
      };

      // 4. Si on a un nouveau fichier, mettre à jour le champ img
      if (file) {
        dataToUpdate.img = file.path; // ou construire une URL publique
      }

      // Mise à jour du produit
      const updatedProduit = await this.prisma.produit.update({
        where: { id: Number(id) },
        data: {
          nom: updateProduitDto.nom,
          description: updateProduitDto.description,
          img: updateProduitDto.img,
          tags: JSON.parse(updateProduitDto.tags),
          categories: {
            connect: { id: Number(updateProduitDto.categorie) },
          },
          Prix: {
            update: {
              where: {
                id: existingPrix.id,
              },
              data: {
                prix: updateProduitDto.prix,
                quantiter: Number(updateProduitDto.quantiter),
              },
            },
          },
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: `Produit #${id} mis à jour avec succès`,
        data: updatedProduit,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erreur lors de la mise à jour du produit',
      );
    }
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
          fs.unlinkSync(existingProduit.img);
        } catch (error) {
          console.error(`Erreur de suppression de l'image :`, error);
          // vous pouvez ignorer ou lever une exception selon votre logique
        }
      }

      // (Facultatif) Si vous stockez l'image localement, supprimez le fichier ici
      // fs.unlinkSync(existingProduit.img) si le champ img est un path local.

      await this.prisma.produit.delete({
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

  // ========== RECHERCHE / PAGINATION ==========
  async findAllProduits(query: SearchProduitsDto) {
    const {
      nom,
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

    // Filtre par nom
    if (nom) {
      whereClause.nom = { contains: nom, mode: 'insensitive' };
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
    const pageSize = limit ? Number(limit) : 10;
    const skip = (pageNumber - 1) * pageSize;

    try {
      // Récupération du count total + des produits
      const [totalCount, produits] = await Promise.all([
        this.prisma.produit.count({ where: whereClause }),
        this.prisma.produit.findMany({
          where: whereClause,
          skip,
          take: pageSize,
          include: {
            categories: true,
            Prix: {
              include: {
                boutiques: true,
              },
            },
          },
        }),
      ]);

      const dataFiltered = produits.map((res) => {
        const filter = res.Prix.map((prix) => {
          return {
            prix: prix.prix,
            boutique: {
              id: prix.boutiques.id,
              nom: prix.boutiques.nom,
              location: prix.boutiques.location,
              phone: prix.boutiques.phone,
            },
          };
        });

        return filter.map((el) => {
          const categorie = res.categories.nom;
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
