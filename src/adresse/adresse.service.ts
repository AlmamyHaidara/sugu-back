import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdresseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdresseDto: CreateAdresseDto) {
    try {
      console.log(createAdresseDto);

      if (
        Object.keys(createAdresseDto).length <= 0 ||
        Object.values(createAdresseDto).length === 0
      ) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Veuillez renseigne correctement les champs',
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        return 'This action adds a new adresse';
      }
      const adresse = await this.prisma.$transaction(async (transaction) => {
        return transaction.adresse.create({
          data: {
            nom: createAdresseDto.nom,
            quartier: createAdresseDto.quartier,
            telephone: createAdresseDto.telephone,
            descrition: createAdresseDto.description,
            utilisateurs: {
              connect: {
                id: createAdresseDto.userId,
              },
            },
          },
        });
      });
      if (!adresse) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Veuillez renseigne correctement les champs',
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        return 'This action adds a new adresse';
      }

      return {
        status: 201,
        data: adresse,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return null;
    }
  }

  async findAll() {
    try {
      const adresses = await this.prisma.adresse.findMany();
      return { status: 200, data: adresses || [] };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return null;
    }
  }

  async findOne(id: number) {
    try {
      const adresses = await this.prisma.adresse.findMany({
        where: {
          id: id,
        },
      });
      return { status: 200, data: adresses || [] };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return null;
    }
  }

  async findOneByUserId(id: number) {
    try {
      const adresses = await this.prisma.adresse.findMany({
        where: {
          userId: id,
        },
      });
      return { status: 200, data: adresses || [] };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return null;
    }
  }

  async update(id: number, updateAdresseDto: UpdateAdresseDto) {
    try {
      console.log(updateAdresseDto);

      if (
        Object.keys(updateAdresseDto).length <= 0 ||
        Object.values(updateAdresseDto).length === 0
      ) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Veuillez renseigne correctement les champs',
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        return 'This action adds a new adresse';
      }
      // const isExist = await this.findOne(updateAdresseDto.id);
      const isExist = await this.prisma.adresse.findUnique({
        where: { id: id, userId: updateAdresseDto.userId },
        select: {
          id: true,
        },
      });

      if (!isExist.id) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Adresse introuvable',
            error: 'Adresse introuvable',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const adresse = await this.prisma.$transaction(async (transaction) => {
        return transaction.adresse.update({
          where: {
            id: id,
          },
          data: {
            nom: updateAdresseDto.nom,
            quartier: updateAdresseDto.quartier,
            telephone: updateAdresseDto.telephone,
            descrition: updateAdresseDto.description,
            utilisateurs: {
              connect: {
                id: updateAdresseDto.userId,
              },
            },
          },
        });
      });
      if (!adresse) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Veuillez renseigne correctement les champs',
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        status: HttpStatus.OK,
        data: adresse,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return null;
    }
  }

  async remove(id: number, userId: number) {
    try {
      // const isExist = await this.findOne(updateAdresseDto.id);
      const isExist = await this.prisma.adresse.findUnique({
        where: { id: id, userId: userId },
        select: {
          id: true,
        },
      });

      if (!isExist.id) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Adresse introuvable',
            error: 'Adresse introuvable',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.prisma.$transaction(async (transaction) => {
        return transaction.adresse.delete({
          where: {
            id: id,
          },
        });
      });
      return {
        status: 200,
        msg: `L'adresse ${id} a ete suprimer avec succes`,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return null;
    }
  }
}
