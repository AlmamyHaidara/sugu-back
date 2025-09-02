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
import { PasswordUpdate, Public } from './constants';
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
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('password-forget')
  passwordForget(@Body() email: Record<string, string>) {
    return this.authService.passwordForget(email.email);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('inscription')
  signUp(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return this.authService.signUp(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('update-password')
  updatePassword(@Body() createUserDto: PasswordUpdate) {
    return this.authService.updatePassword(createUserDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('fetch-token')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.sub);
  }
}
