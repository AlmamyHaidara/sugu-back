import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { FavorieService } from './favorie.service';
import { CreateFavorieDto } from './dto/create-favorie.dto';
import { UpdateFavorieDto } from './dto/update-favorie.dto';
import * as jwt from 'jsonwebtoken';

@Controller('favorie')
export class FavorieController {
  constructor(private readonly favorieService: FavorieService) {}

  @Post()
  create(@Req() req: Request, @Body() createFavorieDto: CreateFavorieDto) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Body reçu:', decoded);
    return this.favorieService.create(createFavorieDto);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.favorieService.findAll(Number(userId));
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
