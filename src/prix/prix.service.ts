import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePrixDto } from './dto/create-prix.dto';
import { UpdatePrixDto } from './dto/update-prix.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExeceptionCase } from 'src/utils/constants';

@Injectable()
export class PrixService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPrixDto: CreatePrixDto) {
    try {
      const produitIsExiste = await this.prisma.produit.findFirst({
        where: {
          id: Number(createPrixDto.produitId),
        },
      });

      const boutiqueIsExiste = await this.prisma.boutique.findFirst({
        where: {
          id: Number(createPrixDto.boutiqueId),
        },
      });

      if (!produitIsExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Produit introuvable.',
            error: 'Non trouvez',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (!boutiqueIsExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Boutique introuvable.',
            error: 'Non trouvez',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const produit = await this.prisma.$transaction(async (prisma) => {
        return await prisma.prix.create({
          data: {
            prix: createPrixDto.prix,
            quantiter: createPrixDto.quantiter,
            boutiques: {
              connect: {
                id: Number(createPrixDto.boutiqueId),
              },
            },
            produits: {
              connect: {
                id: Number(createPrixDto.produitId),
              },
            },
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
      const produit = await this.prisma.prix.findMany();
      return { status: 200, data: produit || [] };
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async findOne(id: number, productId: number, boutiqueId: number) {
    try {
      const isExiste = await this.prisma.prix.findFirst({
        where: {
          id: Number(id),
          produitId: Number(productId),
          boutiqueId: Number(boutiqueId),
        },
      });

      if (!isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Prix introuvable.',
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

  async update(id: number, updatePrixDto: UpdatePrixDto) {
    try {
      const prixIsExiste = await this.prisma.prix.findFirst({
        where: {
          id: Number(id),
        },
      });

      const produitIsExiste = await this.prisma.produit.findFirst({
        where: {
          id: Number(updatePrixDto.produitId),
        },
      });

      const boutiqueIsExiste = await this.prisma.boutique.findFirst({
        where: {
          id: Number(updatePrixDto.boutiqueId),
        },
      });

      if (!prixIsExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Prix introuvable.',
            error: 'Non trouvez',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (!produitIsExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Produit introuvable.',
            error: 'Non trouvez',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (!boutiqueIsExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Boutique introuvable.',
            error: 'Non trouvez',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const produit = await this.prisma.$transaction(async (prisma) => {
        return await prisma.prix.update({
          where: {
            id: Number(id),
            boutiqueId: updatePrixDto.boutiqueId,
            produitId: updatePrixDto.produitId,
          },
          data: {
            prix: updatePrixDto.prix,
            quantiter: updatePrixDto.quantiter,
            boutiques: {
              connect: {
                id: Number(updatePrixDto.boutiqueId),
              },
            },
            produits: {
              connect: {
                id: Number(updatePrixDto.produitId),
              },
            },
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

  async findOneManyById(ids: number[]): Promise<{ id: number }[] | null> {
    try {
      const userExist = await this.prisma.prix.findMany({
        where: {
          id: {
            in: ids, // Filtrer les enregistrements correspondant aux ID
          },
        },
        select: {
          id: true, // Récupérer uniquement le champ 'id'
        },
      });

      return userExist.length > 0 ? userExist : null; // Retourne null si aucun résultat
    } catch (error) {
      console.error('Error in findOneManyById:', error);
      return null;
    }
  }

  async findOneById(id: number): Promise<{ id: number } | null> {
    try {
      const userExist = await this.prisma.prix.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true, // Récupérer uniquement le champ 'id'
        },
      });

      return userExist.id > 0 ? userExist : null; // Retourne null si aucun résultat
    } catch (error) {
      console.error('Error in findOneManyById:', error);
      return null;
    }
  }

  async findOneByUserId(id: number): Promise<{ id: number } | null> {
    try {
      const isShop = await this.prisma.boutique.findFirst({
        where: {
          utilisateurs: {
            id: id,
            profile: 'BOUTIQUIER',
          },
        },
      });

      if (!isShop) {
        return null;
      }
      const boutique = isShop && isShop?.id > 0 && isShop;
      const userExist = await this.prisma.prix.findFirst({
        where: {
          boutiqueId: isShop.id,
        },
        select: {
          id: true,
          boutiques: true,
        },
      });
      if (userExist?.id) {
        delete userExist.boutiques;
        return userExist.id > 0 ? { ...userExist, ...boutique } : null; // Retourne null si aucun résultat
      }
      return isShop.id > 0 ? { ...boutique } : null;
    } catch (error) {
      console.error('Error in findOneManyById:', error);
      return null;
    }
  }

  async remove(id: number) {
    try {
      const isExiste = await this.prisma.prix.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Prix introuvable.',
            error: 'Non trouvez',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.$transaction(async (prisma) => {
        return await prisma.prix.delete({
          where: {
            id: Number(id),
          },
        });
      });

      return {
        status: 200,
        msg: `La prix ${id} a ete suprimer avec succes`,
      };
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }
}
