import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FindAllProduitQueryDto } from './dto/FindAllProduitQuery.dto';
import { Public } from 'src/auth/constants';
import { SearchProduitsDto } from './dto/SearchProduits.dto';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath =
            process.env.PRODUIT_UPLOAD_DIR || './uploads/produits';
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname).toLowerCase();
          const filename = `produit-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/i)) {
          return callback(
            new Error('Seuls les fichiers JPG, JPEG et PNG sont autorisés !'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProduitDto: CreateProduitDto,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    const created = await this.produitService.create({
      ...createProduitDto,
      img: file.path, // ou construire une URL si besoin
    });

    return created;
  }

  @Public()
  @Get()
  async findAll(@Query() query: SearchProduitsDto) {
    return this.produitService.findAllProduits(query);
  }

  @Get('shop-products/:id')
  findAllByShop(@Param('id', ParseIntPipe) id: number) {
    return this.produitService.findAllByShop(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const produit = await this.produitService.findOne(id);
    if (!produit) {
      throw new NotFoundException(`Produit #${id} introuvable`);
    }
    return produit;
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads/produits',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `produit-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new Error('Seuls les fichiers JPG, JPEG et PNG sont autorisés !'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File, // <-- Récupérer le nouveau fichier
    @Body() updateProduitDto: UpdateProduitDto,
  ) {
    // Si file existe, c’est qu’on upload une nouvelle image
    const updatedProduit = await this.produitService.update(
      id,
      updateProduitDto,
      file,
    );
    return updatedProduit;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const produitSupprimé = await this.produitService.remove(id);
    return {
      message: 'Produit supprimé avec succès',
      data: produitSupprimé,
    };
  }

  @Get('by-shop-id/:shopId/:userId')
  async getByShopIdAndUserId(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const produitSupprimé = await this.produitService.findByUserIdAndShopId(
      shopId,
      userId,
    );
    return produitSupprimé;
  }
}
