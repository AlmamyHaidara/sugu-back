import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from 'src/auth/auth.service';
import { Profile } from '@prisma/client';
import { genererMotDePasse } from 'src/utils/functions';
import { UsersService } from 'src/users/users.service';
import { templateToSendShopidentyMail } from 'src/mail/data';
import { hash } from 'bcrypt';

@Injectable()
export class BoutiqueService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) {}

  // ========== CREATE ==========
  async create(createBoutiqueDto: CreateBoutiqueDto) {
    try {
      // Vérifier si la boutique existe déjà par nom (optionnel)
      const existingByName = await this.prisma.boutique.findFirst({
        where: { nom: createBoutiqueDto.nom },
      });

      console.log(existingByName);

      if (existingByName) {
        // vous pouvez lever une exception si vous ne voulez pas de doublon
        // throw new ConflictException('Une boutique avec ce nom existe déjà');
      }

      const country = await this.prisma.country.findUnique({
        where: { id: Number(createBoutiqueDto.countryId) },
      });

      if (!country) {
        throw new NotFoundException(
          `Country #${createBoutiqueDto.countryId} introuvable`,
        );
      }

      const password = genererMotDePasse(8);

      const boutique = await this.prisma.boutique.create({
        data: {
          nom: createBoutiqueDto.nom,
          phone: createBoutiqueDto.phone,
          location: createBoutiqueDto.location,
          email: createBoutiqueDto.email,
          img: createBoutiqueDto.img,
          description: createBoutiqueDto.description,
          categorie: createBoutiqueDto.categorie,
          utilisateurs: {
            connectOrCreate: {
              where: {
                email: createBoutiqueDto.email,
              },
              create: {
                nom: createBoutiqueDto.nom,
                email: createBoutiqueDto.email,
                telephone: createBoutiqueDto.phone,
                avatar: createBoutiqueDto.img,
                password: await hash(password, 10),
                profile: Profile.BOUTIQUIER,
              },
            },
          },
          country: {
            connect: {
              id: Number(country.id),
            },
          },
        },
      });

      await this.mailService.sendMail(
        [createBoutiqueDto.email],
        'Les identifiant de votre boutique',
        templateToSendShopidentyMail(
          password,
          createBoutiqueDto.nom,
          createBoutiqueDto.email,
        ),
      );

      return {
        statusCode: 201,
        message: 'Boutique créée avec succès',
        data: boutique,
      };
      // });
    } catch (error) {
      console.error(error);

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
      const boutiques = await this.prisma.boutique.findMany({
        include: {
          country: true,
        },
      });

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
              produits: {
                include: {
                  categories: true,
                },
              },
            },
          },
        },
      });
      if (!boutique) {
        throw new NotFoundException(`Boutique #${shopId} introuvable`);
      }
      const boutiqueFiltered = boutique.Prix.map((prix) => {
        const customPrice = {
          ...prix.produits,
          categorie: prix.produits.categories.nom,
          produitId: prix.produitId,
          boutiqueId: prix.boutiqueId,
          prix: prix.prix,
        };

        delete customPrice.categories;
        delete prix.produits;
        return customPrice;
      });
      return {
        statusCode: 200,
        data: boutiqueFiltered,
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

      // const boutiques = await this.prisma.boutique.findMany({
      //   where: { userId: userId },
      // });

      const boutiques = await this.prisma.boutique.findMany();
      console.log(boutiques);

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
      const boutiques = await this.prisma.boutique.findMany({
        include: {
          country: true,
        },
      });
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

  async getStatistic(id: number) {
    try {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth() - 4, 1); // Début du 5e mois
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Fin du mois en cours

      const commandes = await this.prisma.commande.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
          LigneCommand: {
            some: {
              Prix: {
                boutiqueId: id,
              },
            },
          },
        },
        include: {
          LigneCommand: {
            include: {
              Prix: true,
            },
          },
        },
      });
      // console.log(bo);

      const sales = this.getSalesStats(commandes);

      const orders = this.getOrderStats(commandes);

      const revenue = this.getRevenueStats(commandes);
      return {
        statusCode: 200,
        data: { sales, orders, revenue },
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
    console.log(updateBoutiqueDto);

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
      console.log(error);

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

  private getSalesStats = (commandes) => {
    // 📌 Obtenir la date actuelle et le mois en cours
    const today = new Date();
    const currentMonth = today.getMonth(); // Mois actuel (0-11)
    const currentYear = today.getFullYear(); // Année actuelle

    // 📌 Initialiser un tableau pour stocker les ventes par jour (31 jours max)
    const dailySales = Array.from({ length: 31 }, () => 0);

    // 📌 Filtrer les commandes livrées (`LIVRER`) du mois en cours
    const filtered = commandes.filter((cmd) => {
      if (cmd.etat === 'LIVRER') {
        const cmdDate = new Date(cmd.createdAt); // Convertir `createdAt` en Date
        return (
          cmdDate.getMonth() === currentMonth &&
          cmdDate.getFullYear() === currentYear
        );
      }
      return false;
    });

    // 📌 Remplir `dailySales` avec le nombre de commandes par jour
    filtered.forEach((cmd) => {
      const day = new Date(cmd.createdAt).getDate() - 1; // Récupérer le jour (1-31) et ajuster en index (0-30)
      dailySales[day] += 1;
    });

    // 📌 Construire l'objet résultat
    return {
      total: filtered.length, // Nombre total de commandes livrées
      daily: dailySales.slice(0, today.getDate()), // Tronquer jusqu'au jour actuel
    };
  };

  private getRevenueStats = (cmd: any[]) => {
    const commandes = cmd.filter((cm) => {
      return cm.etat == 'LIVRER';
    });
    const today = new Date();
    const currentMonth = today.getMonth(); // Mois actuel (0-11)
    const currentYear = today.getFullYear();

    // 📌 Initialiser un tableau pour stocker les revenus des 5 derniers mois
    const monthlyRevenue = Array(5).fill(0);

    commandes.forEach((commande) => {
      const cmdDate = new Date(commande.createdAt);
      const cmdMonth = cmdDate.getMonth();
      const cmdYear = cmdDate.getFullYear();

      // 📌 Vérifier si la commande appartient aux 5 derniers mois
      for (let i = 0; i < 5; i++) {
        const targetMonth = (currentMonth - i + 12) % 12;
        const targetYear = currentYear - (currentMonth - i < 0 ? 1 : 0);

        if (cmdMonth === targetMonth && cmdYear === targetYear) {
          // 💰 Additionner le prix de chaque LigneCommand
          const revenue = commande.LigneCommand.reduce((acc, line) => {
            return acc + (parseFloat(line?.Prix?.prix) || 0) * line.quantiter;
          }, 0);

          monthlyRevenue[i] += revenue;
        }
      }
    });

    // 📌 Calculer le revenu total
    const totalRevenue = monthlyRevenue.reduce((acc, val) => acc + val, 0);

    return {
      total: totalRevenue,
      monthly: monthlyRevenue.reverse(), // ✅ Inverser pour afficher du plus ancien au plus récent
    };
  };

  private getOrderStats = (commandes) => {
    // 📌 Initialiser les compteurs
    const stats = {
      pending: 0, // ATTENTE
      shipped: 0, // VALIDER
      delivered: 0, // LIVRER
      cancelled: 0, // ANNULER
    };

    // 📌 Parcourir les commandes et incrémenter le bon compteur
    commandes.forEach((commande) => {
      switch (commande.etat) {
        case 'ATTENTE':
          stats.pending += 1;
          break;
        case 'VALIDER':
          stats.shipped += 1;
          break;
        case 'LIVRER':
          stats.delivered += 1;
          break;
        case 'ANNULER':
          stats.cancelled += 1;
          break;
        default:
          break;
      }
    });

    return stats;
  };
}
