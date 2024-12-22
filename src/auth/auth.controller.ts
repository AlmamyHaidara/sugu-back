import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateProduitDto } from 'src/produit/dto/create-produit.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('connexion')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  

  @HttpCode(HttpStatus.OK)
  @Post('inscription')
  signUp(@Body() createUserDto: CreateUserDto) {
          console.log(createUserDto);
          
          return this.authService.signUp(createUserDto);
        }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
