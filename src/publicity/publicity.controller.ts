import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicityService } from './publicity.service';
import { CreatePublicityDto } from './dto/create-publicity.dto';
import { UpdatePublicityDto } from './dto/update-publicity.dto';

@Controller('publicity')
export class PublicityController {
  constructor(private readonly publicityService: PublicityService) {}

  @Post()
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
  update(@Param('id') id: string, @Body() updatePublicityDto: UpdatePublicityDto) {
    return this.publicityService.update(+id, updatePublicityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicityService.remove(+id);
  }
}
