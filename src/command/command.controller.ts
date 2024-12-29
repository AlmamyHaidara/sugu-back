import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandService } from './command.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';

@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Post()
  create(@Body() createCammandDto: CreateCommandDto) {
    return this.commandService.create(createCammandDto);
  }

  @Get()
  findAll() {
    return this.commandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCammandDto: UpdateCommandDto) {
    return this.commandService.update(+id, updateCammandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandService.remove(+id);
  }
}
