import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Public } from 'src/auth/constants';
import { SearchProduitsDto } from './dto/SearchProduits.dto';
import { Express } from 'express';
import * as jwt from 'jsonwebtoken';
import { decodejwt } from 'src/utils/functions';
import { $Enums } from '@prisma/client';
import { existsSync, mkdirSync } from 'fs';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('imgs', 10, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath =
            process.env.PRODUIT_UPLOAD_DIR || './uploads/produits';
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
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
            new BadRequestException(
              'Seuls les fichiers JPG, JPEG et PNG sont autorisés !',
            ),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        files: 10, // max number of files
        fileSize: 5 * 1024 * 1024, // 5 MB per file
      },
    }),
  )
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createProduitDto: CreateProduitDto,
  ) {
    if (!files) {
      throw new BadRequestException('Image file is required');
    }
    const imgs = files.map(
      (file) =>
        file.path.split('uploads/')[1] || file.path.split('uploads\\')[1],
    );
    const created = await this.produitService.create({
      ...createProduitDto,
      imgs, // ou construire une URL si besoin
    });

    return created;
  }

  @Public()
  @Get()
  async findAll(@Req() req: Request, @Query() query: SearchProduitsDto) {
    const userId = decodejwt(req);
    if (userId != 0) {
      return this.produitService.findAllProduits(query, userId);
    }
    return this.produitService.findAllProduits(query);
  }

  @Public()
  @Get('country/:id')
  async findAllProductByCountryId(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = decodejwt(req);
    if (userId != 0) {
      return this.produitService.findAllProduitsByCountryId(id, userId);
    }
    return this.produitService.findAllProduitsByCountryId(id);
  }

  @Public()
  @Get('shop-products-client/:id')
  findAllByShopClient(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = decodejwt(req);
    if (userId != 0) {
      return this.produitService.findAllByShop(id, userId);
    }
    return this.produitService.findAllByShop(id);
  }

  @Get('shop-products/:id')
  findAllByShop(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const userId = decodejwt(req);
    if (userId != 0) {
      return this.produitService.findAllByShop(id, userId);
    }
    return this.produitService.findAllByShop(id);
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const produit = await this.produitService.findOne(id);
    if (!produit) {
      throw new NotFoundException(`Produit #${id} introuvable`);
    }
    return produit;
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('imgs', 10, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath =
            process.env.PRODUIT_UPLOAD_DIR || './uploads/produits';
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
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
            new BadRequestException(
              'Seuls les fichiers JPG, JPEG et PNG sont autorisés !',
            ),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        files: 10, // max number of files
        fileSize: 5 * 1024 * 1024, // 5 MB per file
      },
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() updateProduitDto: UpdateProduitDto,
  ) {
    if (!files) {
      throw new BadRequestException('Image file is required');
    }

    console.log(updateProduitDto);
    // Si file existe, c’est qu’on upload une nouvelle image
    const updatedProduit = await this.produitService.update(
      id,
      updateProduitDto,
      files,
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
    return await this.produitService.findByUserIdAndShopId(shopId, userId);
  }

  @Get('by-shop-id/:shopId/')
  async getByShopId(
    @Req() req: Request,
    @Param('shopId', ParseIntPipe) shopId: number,
  ) {
    return await this.produitService.findByShopId(shopId);
  }
}
