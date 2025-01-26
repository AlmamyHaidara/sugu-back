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
} from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Public } from 'src/auth/constants';

@Controller('boutique')
export class BoutiqueController {
  constructor(private readonly boutiqueService: BoutiqueService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads/boutiques',
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `boutique-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new Error('Only JPG, JPEG, and PNG files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBoutiqueDto: CreateBoutiqueDto,
  ) {
    try {
      return this.boutiqueService.create({
        ...createBoutiqueDto,
        img: file?.path,
      });
    } catch (error) {
      console.error('Error creating boutique', error.stack);
    }
  }

  // @Public()
  // @Get()
  // findAll() {
  //   return this.boutiqueService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boutiqueService.findOne(+id);
  }

  @Public()
  @Get('')
  findAllWithProducts() {
    return this.boutiqueService.findAllShopAndProducts();
  }

  @Public()
  @Get('/all-produits/:id')
  findBoutiqueProduit(@Param('id') id: string) {
    return this.boutiqueService.findAllShopWithProducts(+id);
  }

  @Public()
  @Get('/all-produits/user/:id')
  findBoutiqueByUserId(@Param('id') id: string) {
    return this.boutiqueService.findAllShopByUser(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoutiqueDto: UpdateBoutiqueDto,
  ) {
    console.log(id);

    return this.boutiqueService.update(+id, updateBoutiqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boutiqueService.remove(+id);
  }
}
