import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExeceptionCase } from 'src/utils/constants';

@Injectable()
export class BoutiqueService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBoutiqueDto: CreateBoutiqueDto) {
    try {
      const isExiste = await this.prisma.boutique.findFirst({
        where: {
          nom: createBoutiqueDto.nom,
        },
      });

      const user = await this.prisma.utilisateur.findUnique({
        where: {
          id: Number(createBoutiqueDto.userId),
        },
      });

      if (isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'Boutique existe déjà.',
            error: 'Conflict',
          },
          HttpStatus.CONFLICT,
        );
      }

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Utilisateur introuvable.',
            error: 'Non Trouvez',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      console.log(!user);

      const boutique = await this.prisma.$transaction(async (prisma) => {
        return await prisma.boutique.create({
          data: {
            nom: createBoutiqueDto.nom,
            categorie: createBoutiqueDto.categorie,
            description: createBoutiqueDto.description,
            img: createBoutiqueDto.img,
            utilisateurs: {
              connect: {
                id: Number(createBoutiqueDto.userId),
              },
            },
          },
        });
      });

      return {
        status: 201,
        data: boutique,
      };
    } catch (error) {
      console.error(error);
      switch (error.status) {
        case 409:
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              message: 'Boutique existe déjà.',
              error: 'Conflict',
            },
            HttpStatus.CONFLICT,
          );
          break;
        case 404:
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Donnee introuvable.',
              error: 'Non Trouvez',
            },
            HttpStatus.NOT_FOUND,
          );
          break;

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

  async findAllShopWithProducts(shopId: number) {
    try {
      return await this.prisma.boutique.findFirst({
        where: {
          id: shopId,
        },
        include: {
          Prix: {

            where: {
              boutiqueId: shopId,
            },
            include: {
              produits: true,
            },
          },
        },
      });
      return;
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    try {
      const boutiques = await this.prisma.boutique.findMany();
      return { status: 200, data: boutiques || [] };
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async findOne(id: number) {
    try {
      const isExiste = await this.prisma.boutique.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Boutique introuvable.',
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

  async update(id: number, updateBoutiqueDto: UpdateBoutiqueDto) {
    try {
      const isExiste = await this.prisma.boutique.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Boutique introuvable.',
            error: 'Non trouvez',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const boutique = await this.prisma.$transaction(async (prisma) => {
        return await prisma.boutique.update({
          where: {
            id: Number(id),
          },
          data: updateBoutiqueDto,
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
      const isExiste = await this.prisma.boutique.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Boutique introuvable.',
            error: 'Non trouvez',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.$transaction(async (prisma) => {
        return await prisma.boutique.delete({
          where: {
            id: Number(id),
          },
        });
      });

      return {
        status: 200,
        msg: `La boutique ${id} a ete suprimer avec succes`,
      };
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }
}
