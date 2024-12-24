import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePanierDto } from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { count } from 'console';
import { ExeceptionCase } from 'src/utils/constants';

@Injectable()
export class PanierService {
  constructor(private prisma: PrismaService) {}

  async addToCart(data: {
    utilisateurId: number;
    produitId: number;
    boutiqueId: number;
    count: number;
  }) {
    try {
      const user = await this.prisma.utilisateur.findFirst({
        where: {
          id: data.utilisateurId,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Ressource non trover.',
            error: 'Non trouve',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const boutique = await this.prisma.boutique.findFirst({
        where: {
          id: data.boutiqueId,
        },
        select: {
          id: true,
        },
      });

      console.log('fvgfv', data.utilisateurId, data.produitId, data.boutiqueId);
      if (!boutique) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Ressource non trover.',
            error: 'Non trouve',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const produit = await this.prisma.produit.findFirst({
        where: {
          id: data.produitId,
        },
        select: {
          id: true,
        },
      });

      if (!produit) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Ressource non trover.',
            error: 'Non trouve',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const newPanier = await this.prisma.panier.create({
        data: {
          count: data.count,
          boutiques: {
            connect: {
              id: data.boutiqueId,
            },
          },
          produits: {
            connect: {
              id: data.produitId,
            },
          },
          utilisateurs: {
            connect: {
              id: data.utilisateurId,
            },
          },
        },
      });

      if (!newPanier) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal error',
            error: 'Internal error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return newPanier;
    } catch (error) {
      console.error(Object.keys(error));

      return null;
    }
  }

  async getCart(boutiqueId: number) {
    return this.prisma.panier.findMany({
      where: { boutiqueId },
      include: {
        produits: true,
        boutiques: true,
      },
    });
  }

  async getCartByUser(utilisateurId: number) {
    return this.prisma.panier.findMany({
      where: { utilisateurId },
      include: {
        produits: true,
        boutiques: true,
      },
    });
  }

  async updateCartItem(id: number, count: number) {
    return this.prisma.panier.update({
      where: { id },
      data: { count },
    });
  }

  async removeFromCart(id: number) {
    return this.prisma.panier.delete({
      where: { id },
    });
  }

  async emptyCart(boutiqueId: number) {
    return this.prisma.panier.deleteMany({
      where: { boutiqueId },
    });
  }
}
