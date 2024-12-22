import { Injectable } from '@nestjs/common';
import { CreatePanierDto } from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PanierService {
  constructor(private prisma: PrismaService) {}

  async addToCart(data: {
    produitId: number;
    boutiqueId: number;
    count: number;
  }) {
    return this.prisma.panier.create({
      data,
    });
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
