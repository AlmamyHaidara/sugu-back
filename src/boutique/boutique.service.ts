import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';

@Injectable()
export class BoutiqueService {
  constructor(private readonly prisma: PrismaService) {}

  // ========== CREATE ==========
  async create(createBoutiqueDto: CreateBoutiqueDto) {
    try {
      // Vérifier l'utilisateur
      const user = await this.prisma.utilisateur.findUnique({
        where: { id: Number(createBoutiqueDto.userId) },
      });
      if (!user) {
        throw new NotFoundException(
          `Utilisateur #${createBoutiqueDto.userId} introuvable`,
        );
      }

      // Vérifier si la boutique existe déjà par nom (optionnel)
      const existingByName = await this.prisma.boutique.findFirst({
        where: { nom: createBoutiqueDto.nom },
      });
      if (existingByName) {
        // vous pouvez lever une exception si vous ne voulez pas de doublon
        // throw new ConflictException('Une boutique avec ce nom existe déjà');
      }

      const boutique = await this.prisma.boutique.create({
        data: {
          nom: createBoutiqueDto.nom,
          phone: createBoutiqueDto.phone,
          location: createBoutiqueDto.location,
          img: createBoutiqueDto.img,
          description: createBoutiqueDto.description,
          categorie: createBoutiqueDto.categorie,
          utilisateurs: {
            connect: {
              id: Number(createBoutiqueDto.userId),
            },
          },
          country: {
            connect: {
              id: Number(createBoutiqueDto.countryId),
            },
          },
        },
      });

      return {
        statusCode: 201,
        data: boutique,
      };
    } catch (error) {
      // Vous pouvez logger l'erreur
      throw new InternalServerErrorException(
        'Erreur lors de la création de la boutique',
      );
    }
  }

  // ========== FIND ALL SHOPS + PRODUCTS ==========
  async findAllShopAndProducts() {
    try {
      // Récupérer toutes les boutiques
      const boutiques = await this.prisma.boutique.findMany();

      // Récupérer tous les produits (vous pouvez inclure plus de relations si besoin)
      const products = await this.prisma.produit.findMany({
        include: {
          categories: {
            select: { nom: true },
          },
          Prix: {
            select: { prix: true, boutiqueId: true },
          },
        },
      });

      // Petit map pour customiser la sortie
      const productCustom = products.map((p) => {
        const cat = p.categories?.nom || null;
        const firstPrix = p.Prix[0] || null;

        // on retire categories et Prix pour éviter la redondance
        delete p.categories;
        delete p.Prix;

        return {
          ...p,
          categorie: cat,
          prix: firstPrix?.prix || null,
          boutiqueId: firstPrix?.boutiqueId || null,
        };
      });

      return {
        statusCode: 200,
        boutiques,
        products: productCustom,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la récupération des boutiques et produits',
      );
    }
  }

  // ========== FIND ONE SHOP + PRODUCTS PAR ID ==========
  async findAllShopWithProducts(shopId: number) {
    try {
      const boutique = await this.prisma.boutique.findUnique({
        where: { id: shopId },
        include: {
          Prix: {
            where: { boutiqueId: shopId },
            include: {
              produits: true,
            },
          },
        },
      });
      if (!boutique) {
        throw new NotFoundException(`Boutique #${shopId} introuvable`);
      }
      return {
        statusCode: 200,
        data: boutique,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la récupération de la boutique et ses produits',
      );
    }
  }

  // ========== FIND ALL SHOPS FOR A USER ==========
  async findAllShopByUser(userId: number) {
    try {
      // Facultatif : vérifier que l'utilisateur existe
      // const user = await this.prisma.utilisateur.findUnique({ where: { id: userId }});
      // if (!user) throw new NotFoundException(`Utilisateur #${userId} introuvable`);

      const boutiques = await this.prisma.boutique.findMany({
        where: { userId: userId },
      });
      return {
        statusCode: 200,
        data: boutiques,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la récupération des boutiques par utilisateur',
      );
    }
  }

  // ========== FIND ALL (BASIC) ==========
  async findAll() {
    try {
      const boutiques = await this.prisma.boutique.findMany();
      return {
        statusCode: 200,
        data: boutiques,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la récupération de toutes les boutiques',
      );
    }
  }

  // ========== FIND ONE PAR ID ==========
  async findOne(id: number) {
    try {
      const boutique = await this.prisma.boutique.findUnique({
        where: { id: Number(id) },
      });
      if (!boutique) {
        throw new NotFoundException(`Boutique #${id} introuvable`);
      }
      return {
        statusCode: 200,
        data: boutique,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la récupération de la boutique',
      );
    }
  }

  // ========== UPDATE ==========
  async update(id: number, updateBoutiqueDto: UpdateBoutiqueDto) {
    // On récupère d'abord la boutique
    const existing = await this.prisma.boutique.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      throw new NotFoundException(`Boutique #${id} introuvable`);
    }

    // Si on a un nouveau champ img => on supprime l'ancien fichier
    if (updateBoutiqueDto.img && existing.img) {
      try {
        fs.unlinkSync(existing.img);
      } catch (err) {
        // Logger l'erreur si besoin
      }
    }

    try {
      const updated = await this.prisma.boutique.update({
        where: { id: Number(id) },
        data: {
          nom: updateBoutiqueDto.nom,
          phone: updateBoutiqueDto.phone,
          location: updateBoutiqueDto.location,
          img: updateBoutiqueDto.img,
          description: updateBoutiqueDto.description,
          categorie: updateBoutiqueDto.categorie,
          utilisateurs: {
            connect: {
              id: Number(updateBoutiqueDto.userId),
            },
          },
          country: {
            connect: {
              id: Number(updateBoutiqueDto.countryId),
            },
          },
        },
      });

      return {
        statusCode: 200,
        data: updated,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la mise à jour de la boutique',
      );
    }
  }

  // ========== REMOVE ==========
  async remove(id: number) {
    // Vérifier l'existence
    const boutique = await this.prisma.boutique.findUnique({
      where: { id: Number(id) },
    });
    if (!boutique) {
      throw new NotFoundException(`Boutique #${id} introuvable`);
    }

    // Supprimer l'image si nécessaire
    if (boutique.img) {
      try {
        fs.unlinkSync(boutique.img);
      } catch (err) {
        // Logger l'erreur si besoin
      }
    }

    try {
      const deleted = await this.prisma.boutique.delete({
        where: { id: Number(id) },
      });
      return {
        statusCode: 200,
        data: deleted,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la suppression de la boutique',
      );
    }
  }
}
