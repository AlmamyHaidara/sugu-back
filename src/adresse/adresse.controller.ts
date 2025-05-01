import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AdresseService } from './adresse.service';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';

@Controller('adresse')
export class AdresseController {
  constructor(private readonly adresseService: AdresseService) {}

  @Post()
  create(@Body() createAdresseDto: CreateAdresseDto) {
    return this.adresseService.create(createAdresseDto);
  }

  @Get()
  findAll() {
    return this.adresseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adresseService.findOne(+id);
  }

  @Get('user/:userId')
  findOneByUserId(@Param('userId') userId: string) {
    return this.adresseService.findOneByUserId(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdresseDto: UpdateAdresseDto) {
    return this.adresseService.update(+id, updateAdresseDto);
  }

  @Put('/default/:id')
  updateToDefault(@Param('id') id: string) {
    return this.adresseService.updateToDefault(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query('userId') userId: string) {
    return this.adresseService.remove(+id, +userId);
  }
}
