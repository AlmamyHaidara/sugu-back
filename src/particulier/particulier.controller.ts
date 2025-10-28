import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ParticulierService } from './particulier.service';
import { CreateParticulierDto } from './dto/create-particulier.dto';
import { UpdateParticulierDto } from './dto/update-particulier.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProduitStatus } from '@prisma/client';
import { SearchProduitsDto } from 'src/produit/dto/SearchProduits.dto';
import { Public } from 'src/auth/constants';
import { Express } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { log } from 'console';

@Controller('particulier')
export class ParticulierController {
  constructor(private readonly particulierService: ParticulierService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('prodImg', 10, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath =
            process.env.PRODUIT_UPLOAD_DIR || './uploads/particulier';
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname).toLowerCase();
          const filename = `particulier-${uniqueSuffix}${ext}`;
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
    /*
    FileInterceptor('prodImg', 10, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath =
            process.env.PRODUIT_UPLOAD_DIR || './uploads/particulier';
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname).toLowerCase();
          const filename = `particulier-${uniqueSuffix}${ext}`;
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
    }),*/
  )
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createParticulierDto: CreateParticulierDto,
  ) {
    console.log(files);

    if (!files || files.length === 0) {
      throw new BadRequestException('Image file is required');
    }

    const imgs = files.map(
      (file) =>
        file.path.split('uploads/')[1] || file.path.split('uploads\\')[1],
    );
    return await this.particulierService.create({
      ...createParticulierDto,
      prodImg: imgs,
    });
  }

  @Get(':userId')
  async findAll(@Param('userId') userId: string) {
    return await this.particulierService.findAllProducts(+userId);
  }

  @Public()
  @Get('/product/approved')
  async findAllApprovedProducts(@Query() query: SearchProduitsDto) {
    return await this.particulierService.findAllApprovedProducts(query);
  }

  @Get(':userId/:produitId')
  async findOne(
    @Param('userId') userId: string,
    @Param('produitId') produitId: string,
  ) {
    return await this.particulierService.findProductById(+userId, +produitId);
  }

  @Get('/products/in/validation/')
  async findAllProductInValidation() {
    return await this.particulierService.findAllProduitsInValidation();
  }

  @Patch('/validation/:produitId/:status')
  async validateProduct(
    @Param('produitId') produitId: string,
    @Param('status') status: string,
    @Body('comment') comment?: string,
  ) {
    return await this.particulierService.validateProduct(
      +produitId,
      status as ProduitStatus,
      comment,
    );
  }

  @Patch()
  @UseInterceptors(
    FilesInterceptor('prodImg', 10, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath =
            process.env.PRODUIT_UPLOAD_DIR || './uploads/particulier';
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname).toLowerCase();
          const filename = `particulier-${uniqueSuffix}${ext}`;
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
    /*
    FileInterceptor('prodImg', 10, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath =
            process.env.PRODUIT_UPLOAD_DIR || './uploads/particulier';
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname).toLowerCase();
          const filename = `particulier-${uniqueSuffix}${ext}`;
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
    }),*/
  )
  async update(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() updateParticulierDto: UpdateParticulierDto,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Image file is required');
    }

    const imgs = files.map(
      (file) =>
        file.path.split('uploads/')[1] || file.path.split('uploads\\')[1],
    );
    return await this.particulierService.updateProduct(
      { ...updateParticulierDto },
      files,
    );
  }

  @Patch('/products/in/revalidation/:produitId')
  async revalidateProduct(@Param('produitId') produitId: string) {
    return await this.particulierService.revalidateProduct(+produitId);
  }

  @Delete(':userId/:produitId')
  remove(
    @Param('userId') userId: string,
    @Param('produitId') produitId: string,
  ) {
    return this.particulierService.deleteProduct(+userId, +produitId);
  }
}
