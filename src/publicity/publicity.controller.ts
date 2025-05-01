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
  Put,
  HttpStatus,
} from '@nestjs/common';
import { PublicityService } from './publicity.service';
import { CreatePublicityDto } from './dto/create-publicity.dto';
import { UpdatePublicityDto } from './dto/update-publicity.dto';
import { CreatePublicityApprovedProductDto } from './dto/create-publicity-approved-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Public } from 'src/auth/constants';

@Controller('publicity')
export class PublicityController {
  constructor(private readonly publicityService: PublicityService) {}

  @Post('/approved')
  approved(@Body() createPublicityDto: CreatePublicityApprovedProductDto) {
    return this.publicityService.validateProduct(
      createPublicityDto.adminId,
      createPublicityDto.produitId,
      createPublicityDto.isApproved,
      createPublicityDto.comment,
    );
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath =
            process.env.PUBLICITY_UPLOAD_DIR || './uploads/publicity';
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname).toLowerCase();
          const filename = `publicity-${uniqueSuffix}${ext}`;
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
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPublicityDto: CreatePublicityDto,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    return this.publicityService.create({
      ...createPublicityDto,
      img: file.path.split('uploads/')[1], // ou construire une URL si besoin
    });
  }

  @Public()
  @Get()
  findAll() {
    return this.publicityService.findAll();
  }

  @Public()
  @Get('active')
  findAllActivePublicity() {
    return this.publicityService.findAllActivePublicity();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicityService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads/publicity'),
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `publicity-${uniqueSuffix}${ext}`);
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
    @Param('id') id: string,
    @Body() updatePublicityDto: UpdatePublicityDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.publicityService.update(+id, {
      ...updatePublicityDto,
      img: file ? file.path.split('uploads/')[1] : updatePublicityDto.img,
    });
    return {
      statusCode: HttpStatus.OK,
      message: `Publicity #${id} mise à jour avec succès`,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.publicityService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: `Publicity #${id} supprimé avec succès`,
    };
  }
}
