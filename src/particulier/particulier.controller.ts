import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ParticulierService } from './particulier.service';
import { CreateParticulierDto } from './dto/create-particulier.dto';
import { UpdateParticulierDto } from './dto/update-particulier.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('particulier')
export class ParticulierController {
  constructor(private readonly particulierService: ParticulierService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('prodImg', {
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
    }),
  )
  async create(
    @Body() createParticulierDto: CreateParticulierDto,
    @UploadedFile() file: Express.Multer.File, // <-- Récupérer le nouveau fichier
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    return await this.particulierService.create({
      ...createParticulierDto,
      prodImg: file.path.split('uploads/')[1],
    });
  }

  @Get(':userId')
  async findAll(@Param('userId') userId: string) {
    return await this.particulierService.findAllProducts(+userId);
  }

  @Get(':userId/:produitId')
  async findOne(
    @Param('userId') userId: string,
    @Param('produitId') produitId: string,
  ) {
    return await this.particulierService.findProductById(+userId, +produitId);
  }

  @Patch()
  @UseInterceptors(
    FileInterceptor('prodImg', {
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
    }),
  )
  async update(
    @UploadedFile() file: Express.Multer.File, // <-- Récupérer le nouveau fichier
    @Body() updateParticulierDto: UpdateParticulierDto,
  ) {
    return await this.particulierService.updateProduct(
      { ...updateParticulierDto },
      file,
    );
  }

  @Delete(':userId/:produitId')
  remove(
    @Param('userId') userId: string,
    @Param('produitId') produitId: string,
  ) {
    return this.particulierService.deleteProduct(+userId, +produitId);
  }
}
