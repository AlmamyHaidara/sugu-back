import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdresseService {
  private readonly logger = new Logger(AdresseService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new address entry in the database.
   *
   * @param {CreateAdresseDto} createAdresseDto - The data transfer object containing the details of the address to be created.
   * @returns {Promise<{status: number, data: any}>} - The status and data of the created address.
   * @throws {HttpException} - Throws an HTTP exception if the input data is invalid or if there is an internal server error.
   */
  async create(createAdresseDto: CreateAdresseDto) {
    try {
      this.logger.log('Creating a new address', createAdresseDto);

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
      }
      const adresse = await this.prisma.$transaction(async (transaction) => {
        return transaction.adresse.create({
          data: {
            nom: createAdresseDto.nom,
            quartier: createAdresseDto.quartier,
            telephone: createAdresseDto.telephone,
            description: createAdresseDto.description,
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
      }

      return {
        status: 201,
        data: adresse,
      };
    } catch (error) {
      this.logger.error('Error creating address', error.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      this.logger.log('Fetching all addresses');
      const adresses = await this.prisma.adresse.findMany();
      return { status: 200, data: adresses || [] };
    } catch (error) {
      this.logger.error('Error fetching all addresses', error.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      this.logger.log(`Fetching address with id ${id}`);
      const adresses = await this.prisma.adresse.findMany({
        where: {
          id: id,
        },
      });
      return { status: 200, data: adresses || [] };
    } catch (error) {
      this.logger.error(`Error fetching address with id ${id}`, error.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByUserId(id: number) {
    try {
      this.logger.log(`Fetching addresses for user with id ${id}`);
      const adresses = await this.prisma.adresse.findMany({
        where: {
          userId: id,
        },
      });
      return { status: 200, data: adresses || [] };
    } catch (error) {
      this.logger.error(
        `Error fetching addresses for user with id ${id}`,
        error.stack,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateAdresseDto: UpdateAdresseDto) {
    try {
      this.logger.log(`Updating address with id ${id}`, updateAdresseDto);

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
      }
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
            description: updateAdresseDto.description,
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
      this.logger.error(`Error updating address with id ${id}`, error.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number, userId: number) {
    try {
      this.logger.log(
        `Removing address with id ${id} for user with id ${userId}`,
      );
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
      this.logger.error(`Error removing address with id ${id}`, error.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
