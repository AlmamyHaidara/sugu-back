import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExeceptionCase } from 'src/utils/constants';

@Injectable()
export class BoutiqueService {
  private readonly logger = new Logger(BoutiqueService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createBoutiqueDto: CreateBoutiqueDto) {
    this.logger.log('Creating a new boutique');
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
      this.logger.warn('Boutique already exists');
      throw new HttpException('Boutique existe déjà.', HttpStatus.CONFLICT);
    }

    if (!user) {
      this.logger.warn('User not found');
      throw new HttpException('Utilisateur introuvable.', HttpStatus.NOT_FOUND);
    }

    const boutique = await this.prisma.$transaction(async (prisma) => {
      return prisma.boutique.create({
        data: {
          nom: createBoutiqueDto.nom,
          categorie: createBoutiqueDto.categorie,
          location: createBoutiqueDto.location,
          img: createBoutiqueDto.img,
          phone: createBoutiqueDto.phone,
          description: createBoutiqueDto.description,
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
  }

  async findAllShopWithProducts(shopId: number) {
    this.logger.log(`Finding all products for shop: ${shopId}`);
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
  }

  async findAllShopByUser(userId: number) {
    this.logger.log(`Finding all shops for user: ${userId}`);
    return await this.prisma.boutique.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async findAll() {
    this.logger.log('Finding all boutiques');
    const boutiques = await this.prisma.boutique.findMany();
    return { status: 200, data: boutiques || [] };
  }

  async findOne(id: number) {
    this.logger.log(`Finding boutique with id: ${id}`);
    const isExiste = await this.prisma.boutique.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isExiste) {
      this.logger.warn(`Boutique not found: ${id}`);
      throw new HttpException('Boutique introuvable.', HttpStatus.NOT_FOUND);
    }
    return { status: 200, data: isExiste || {} };
  }

  async update(id: number, updateBoutiqueDto: UpdateBoutiqueDto) {
    this.logger.log(`Updating boutique with id: ${id}`);
    const isExiste = await this.prisma.boutique.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isExiste) {
      this.logger.warn(`Boutique not found: ${id}`);
      throw new HttpException('Boutique introuvable.', HttpStatus.NOT_FOUND);
    }

    const boutique = await this.prisma.$transaction(async (prisma) => {
      return prisma.boutique.update({
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
  }

  async remove(id: number) {
    this.logger.log(`Removing boutique with id: ${id}`);
    const isExiste = await this.prisma.boutique.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isExiste) {
      this.logger.warn(`Boutique not found: ${id}`);
      throw new HttpException('Boutique introuvable.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.$transaction(async (prisma) => {
      return prisma.boutique.delete({
        where: {
          id: Number(id),
        },
      });
    });

    return {
      status: 200,
      msg: `La boutique ${id} a ete suprimer avec succes`,
    };
  }
}
