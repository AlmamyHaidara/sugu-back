import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFavorieDto } from './dto/create-favorie.dto';
import { UpdateFavorieDto } from './dto/update-favorie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavorieService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFavorieDto: CreateFavorieDto) {
    try {
      // this.prisma.f
      return 'This action adds a new favorie';
    } catch (error) {
      console.log(error);

      // Handle specific Prisma errors, e.g., unique constraint violation, etc.
      throw new BadRequestException(
        'Une erreur est survenue lors de la création de la notification.',
      );
    }
  }

  findAll() {
    return `This action returns all favorie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorie`;
  }

  update(id: number, updateFavorieDto: UpdateFavorieDto) {
    return `This action updates a #${id} favorie`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorie`;
  }
}
