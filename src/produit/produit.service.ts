import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExeceptionCase } from 'src/utils/constants';

@Injectable()
export class ProduitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProduitDto: CreateProduitDto) {
    try {
      const produit = await this.prisma.$transaction(async (prisma) => {
        return await prisma.produit.create({
          data: {
            nom: createProduitDto.nom,
            categorie: createProduitDto.categorie,
            description: createProduitDto.description,
            img: createProduitDto.img,
          },
        });
      });

      return {
        status: 201,
        data: produit,
      };
    } catch (error) {
      console.error(error);
      switch (error.status) {
        case 500:
          throw Error(
            "Une Erreur c'est produit lord de la creation du boutique",
          );
          break;
        default:
          break;
      }
    }
  }

  async findAll() {
    try {
      const produit = await this.prisma.produit.findMany();
      return { status: 200, data: produit || [] };
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async findAllByShop(shopId: number) {
    try {
      const produits = await this.prisma.produit.findMany({
        where: {
          Prix: {
            some: {
              boutiqueId: shopId,
            },
          },
        },
      });
      return { status: 200, data: produits || [] };
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async findOne(id: number) {
    try {
      const isExiste = await this.prisma.produit.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Produit introuvable.',
            error: 'Non trouvez',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return { status: 200, data: isExiste || {} };
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async update(id: number, updateProduitDto: UpdateProduitDto) {
    try {
      const isExiste = await this.prisma.produit.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Produit introuvable.',
            error: 'Non trouvez',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const boutique = await this.prisma.$transaction(async (prisma) => {
        return await prisma.produit.update({
          where: {
            id: Number(id),
          },
          data: updateProduitDto,
        });
      });

      return {
        status: 200,
        data: boutique,
      };
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async remove(id: number) {
    try {
      const isExiste = await this.prisma.produit.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Produit introuvable.',
            error: 'Non trouvez',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const boutique = await this.prisma.$transaction(async (prisma) => {
        return await prisma.produit.delete({
          where: {
            id: Number(id),
          },
        });
      });

      return {
        status: 200,
        msg: `La produit ${id} a ete suprimer avec succes`,
      };
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }
}
