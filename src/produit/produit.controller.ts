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
} from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads/produits', // Dossier où stocker les photos
        filename: (req, file, callback) => {
          // Générer un nom unique pour le fichier
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Extension du fichier
          const filename = `produit-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Accepter uniquement les fichiers image
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
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProduitDto: CreateProduitDto,
  ) {
    return this.produitService.create({ ...createProduitDto, img: file.path });
  }

  @Get()
  findAll() {
    return this.produitService.findAll();
  }

  @Get('shop-products/:id')
  findAllByShop(@Param('id') id: string) {
    return this.produitService.findAllByShop(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {
    return this.produitService.update(+id, updateProduitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produitService.remove(+id);
  }
}
