import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PanierService } from './panier.service';
import { CreatePanierDto } from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';

@Controller('panier')
export class PanierController {
  constructor(private readonly panierService: PanierService) {}

  @Post()
  addToCart(
    @Body()
    addToCartDto: {
      utilisateurId: number;
      produitId: number;
      boutiqueId: number;
      count: number;
    },
  ) {
    return this.panierService.addToCart(addToCartDto);
  }

  @Get(':boutiqueId')
  getCart(@Param('boutiqueId') boutiqueId: string) {
    return this.panierService.getCart(+boutiqueId);
  }

  @Get()
  getCartByUser(@Query('utilisateurId') utilisateurId: string) {
    return this.panierService.getCartByUser(+utilisateurId);
  }

  @Patch(':id')
  updateCartItem(
    @Param('id') id: string,
    @Body() updateCartDto: { count: number },
  ) {
    return this.panierService.updateCartItem(+id, updateCartDto.count);
  }

  @Delete(':id')
  removeFromCart(@Param('id') id: string) {
    return this.panierService.removeFromCart(+id);
  }

  @Delete('/empty/:boutiqueId')
  emptyCart(@Param('boutiqueId') boutiqueId: string) {
    return this.panierService.emptyCart(+boutiqueId);
  }
}
