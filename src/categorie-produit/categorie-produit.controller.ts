import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategorieProduitService } from './categorie-produit.service';
import { CreateCategorieProduitDto } from './dto/create-categorie-produit.dto';
import { UpdateCategorieProduitDto } from './dto/update-categorie-produit.dto';
import { Public } from 'src/auth/constants';

@Controller('categorie-produit')
export class CategorieProduitController {
  constructor(
    private readonly categorieProduitService: CategorieProduitService,
  ) {}

  @Post()
  create(@Body() createCategorieProduitDto: CreateCategorieProduitDto) {
    return this.categorieProduitService.create(createCategorieProduitDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.categorieProduitService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorieProduitService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategorieProduitDto: UpdateCategorieProduitDto,
  ) {
    return this.categorieProduitService.update(+id, updateCategorieProduitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorieProduitService.remove(+id);
  }
}
