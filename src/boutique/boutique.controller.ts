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
  ParseIntPipe,
} from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Public } from 'src/auth/constants';
import { Roles } from 'src/auth/roles.guard';

const boutiqueStorage = {
  storage: diskStorage({
    destination: './uploads/boutiques',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `boutique-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return callback(
        new Error('Seuls JPG, JPEG et PNG sont autorisés'),
        false,
      );
    }
    callback(null, true);
  },
};

@Controller('boutique')
export class BoutiqueController {
  constructor(private readonly boutiqueService: BoutiqueService) {}

  // ========== CREATE ==========
  @Post()
  @Roles('admin')
  @UseInterceptors(FileInterceptor('img', boutiqueStorage))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBoutiqueDto: CreateBoutiqueDto,
  ) {
    // Si un fichier est présent, on stocke son chemin dans le DTO
    if (file) {
      createBoutiqueDto.img = file.path.split('uploads/')[1];
    }
    console.log(file);

    const boutique = await this.boutiqueService.create(createBoutiqueDto);
    return boutique;
  }

  // ========== READ ALL ==========
  @Public()
  @Roles('boutiquier')
  @Get()
  async findAll() {
    console.log('pppp');

    return this.boutiqueService.findAll();
  }

  // ========== READ ONE BY ID ==========
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boutiqueService.findOne(id);
  }

  @Get('statistic/:id')
  async getStatistic(@Param('id', ParseIntPipe) id: number) {
    return this.boutiqueService.getStatistic(id);
  }

  // ========== READ: ALL SHOPS + PRODUCTS ==========
  // @Public()
  @Get('all-with-products')
  findAllWithProducts() {
    return this.boutiqueService.findAllShopAndProducts();
  }

  // ========== READ: ONE SHOP + ALL ITS PRODUCTS ==========
  @Public()
  @Get('all-produits/:id')
  findBoutiqueProduit(@Param('id', ParseIntPipe) id: number) {
    return this.boutiqueService.findAllShopWithProducts(id);
  }

  // ========== READ: SHOPS BY USER ==========
  @Public()
  @Get('all-produits/user/:id')
  findBoutiqueByUserId(@Param('id', ParseIntPipe) userId: number) {
    return this.boutiqueService.findAllShopByUser(userId);
  }

  // ========== UPDATE ==========
  @Patch(':id')
  @UseInterceptors(FileInterceptor('img', boutiqueStorage))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoutiqueDto: UpdateBoutiqueDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Si un fichier est présent, on le met dans le DTO
    if (file) {
      updateBoutiqueDto.img = file.path.split('uploads/')[1];
    }
    const updated = await this.boutiqueService.update(id, updateBoutiqueDto);
    return {
      message: 'Boutique mise à jour avec succès',
      data: updated,
    };
  }

  // ========== DELETE ==========
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const removed = await this.boutiqueService.remove(id);
    return {
      message: 'Boutique supprimée avec succès',
      data: removed,
    };
  }
}
