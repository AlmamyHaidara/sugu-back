import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CountryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll = async () => {
    try {
      const countrys = await this.prisma.country.findMany({
        select: {
          id: true,
          name: true,
          isoCode: true,
        },
      });

      return countrys;
    } catch (error) {
      console.error(error);

      // Vous pouvez logger l'erreur
      throw new InternalServerErrorException(
        'Erreur lors de la recuperation de la liste des pays',
      );
    }
    return [];
  };
}
