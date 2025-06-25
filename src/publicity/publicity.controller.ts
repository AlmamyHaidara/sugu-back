import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { PublicityService } from './publicity.service';
import { CreatePublicityDto } from './dto/create-publicity.dto';
import { UpdatePublicityDto } from './dto/update-publicity.dto';
import { CreatePublicityApprovedProductDto } from './dto/create-publicity-approved-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  create(@Body() createPublicityDto: CreatePublicityDto) {
    return this.publicityService.create(createPublicityDto);
  }
  @Get()
  findAll() {
    return this.publicityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicityDto: UpdatePublicityDto,
  ) {
    return this.publicityService.update(+id, updatePublicityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicityService.remove(+id);
  }
}
