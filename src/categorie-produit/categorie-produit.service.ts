import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategorieProduitDto } from './dto/create-categorie-produit.dto';
import { UpdateCategorieProduitDto } from './dto/update-categorie-produit.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ExeceptionCase } from '../utils/constants';

@Injectable()
export class CategorieProduitService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategorieProduitDto: CreateCategorieProduitDto) {
    try {
      const isExist = this.prisma.categorieProduit.findFirst({
        where: {
          nom: createCategorieProduitDto.nom,
        },
      });

      if (isExist) {
        new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'Cet catégorie de produit existe déja',
            error: 'Existe déja',
          },
          HttpStatus.CONFLICT,
        );
      }

      this.prisma.$transaction(async (transaction) => {
        return transaction.categorieProduit.create({
          data: createCategorieProduitDto,
        });
      });
      // return {
      //   data: category,
      //   status: HttpStatus.CREATED,
      // };
      return 'This action adds a new categorieProduit';
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.categorieProduit.findMany();
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.categorieProduit.findFirst({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  update(id: number, updateCategorieProduitDto: UpdateCategorieProduitDto) {
    try {
      const isExist = this.prisma.categorieProduit.findFirst({
        where: {
          id,
        },
      });
      if (!isExist) {
        new NotFoundException();
      }

      this.prisma.categorieProduit.update({
        where: {
          id,
        },
        data: updateCategorieProduitDto,
      });
      return `This action updates a #${id} categorieProduit`;
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.categorieProduit.delete({
        where: { id },
      });
      return `This action removes a #${id} categorieProduit`;
    } catch (error) {
      console.error(error);
      ExeceptionCase(error);
    }
  }
}
