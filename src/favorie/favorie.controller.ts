import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavorieService } from './favorie.service';
import { CreateFavorieDto } from './dto/create-favorie.dto';
import { UpdateFavorieDto } from './dto/update-favorie.dto';

@Controller('favorie')
export class FavorieController {
  constructor(private readonly favorieService: FavorieService) {}

  @Post()
  create(@Body() createFavorieDto: CreateFavorieDto) {
    return this.favorieService.create(createFavorieDto);
  }

  @Get()
  findAll() {
    return this.favorieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favorieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavorieDto: UpdateFavorieDto) {
    return this.favorieService.update(+id, updateFavorieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favorieService.remove(+id);
  }
}
