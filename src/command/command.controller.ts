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

@Controller('commande')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Post()
  async create(@Body() createCammandDto: CreateCommandDto) {
    return await this.commandService.create(createCammandDto);
  }

  @Post('particulier')
  createParticulier(@Body() createCammandDto: CreateCommandDto) {
    return this.commandService.createParticulier(createCammandDto);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.commandService.findAll(+userId);
  }

  @Get('particulier')
  findAllParticulier(@Query('userId') userId: string) {
    return this.commandService.findAllParticulier(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('userId') userId: string) {
    return this.commandService.findOne(+id, +userId);
  }

  @Get(':id/shop/:shopId')
  findOneByShopId(@Param('id') id: string, @Param('shopId') shopId: string) {
    return this.commandService.findOneByShopId(+id, +shopId);
  }

  @Get('by-shop-id/:shopId')
  findByShopId(@Param('shopId') shopId: string) {
    return this.commandService.findByShopId(+shopId);
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
