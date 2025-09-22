import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFavorieDto } from './dto/create-favorie.dto';
import { UpdateFavorieDto } from './dto/update-favorie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavorieService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFavorieDto: CreateFavorieDto) {
    try {
      const isExist = await this.prisma.favorie.findFirst({
        where: {
          AND: [
            { produitId: createFavorieDto.produitId },
            { userId: createFavorieDto.userId },
          ],
        },
        select: {
          id: true,
        },
      });

      if (!isExist) {
        await this.prisma.produit.findUniqueOrThrow({
          where: {
            id: createFavorieDto.produitId,
          },
          select: {
            id: true,
          },
        });
        await this.prisma.utilisateur.findUniqueOrThrow({
          where: {
            id: createFavorieDto.userId,
          },
          select: {
            id: true,
          },
        });

        const favorie = this.prisma.favorie.create({
          data: {
            produitId: createFavorieDto.produitId,
            userId: createFavorieDto.userId,
          },
        });

        return favorie;
      }
    } catch (error) {
      console.log(error);

      // Handle specific Prisma errors, e.g., unique constraint violation, etc.
      throw new BadRequestException(
        'Une erreur est survenue lors de la création de la notification.',
      );
    }
  }

  findAll(userId: number) {
    try {
      return this.prisma.favorie.findMany({
        where: {
          userId: userId,
        },
        include: {
          product: {
            include: {
              Prix: true,
              categories: true,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);

      // Handle specific Prisma errors, e.g., unique constraint violation, etc.
      throw new BadRequestException(
        'Une erreur est survenue lors de la création de la notification.',
      );
    }
  }

  findOne(id: number) {
    return this.prisma.favorie.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        product: {
          include: {
            Prix: true,
            categories: true,
          },
        },
      },
    });
  }

  update(id: number, updateFavorieDto: UpdateFavorieDto) {
    return `This action updates a #${id} favorie`;
  }

  remove(id: number) {
    try {
      const isExist = this.prisma.favorie.findUniqueOrThrow({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });

      this.prisma.favorie.delete({
        where: {
          id,
        },
      });
      return `This action removes a #${id} favorie`;
    } catch (error) {
      console.log(error);

      // Handle specific Prisma errors, e.g., unique constraint violation, etc.
      throw new BadRequestException(
        'Une erreur est survenue lors de la création de la notification.',
      );
    }
  }
}
