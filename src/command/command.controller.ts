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
import { CommandService } from './command.service';
import { CreateCommandDto, EtatCommand } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { query } from 'express';

@Controller('commande')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Post()
  create(@Body() createCammandDto: CreateCommandDto) {
    return this.commandService.create(createCammandDto);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.commandService.findAll(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('userId') userId: string) {
    return this.commandService.findOne(+id, +userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCammandDto: UpdateCommandDto) {
  //   return this.commandService.update(+id, updateCammandDto);
  // }

  @Put(':id')
  updateCommandeEtat(
    @Param('id') id: string,
    @Body() updateCammandDto: { etat: EtatCommand },
  ) {
    return this.commandService.updateCommandeEtat(+id, updateCammandDto.etat);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commandService.remove(+id);
  // }
}
