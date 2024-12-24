import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { compare } from 'src/utils/bcrypt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; data: UpdateUserDto }> {
    const user = await this.usersService.findOne({ email });

    const verify = await compare(pass, user?.password);
    if (!verify) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };

    const currentUser = await this.usersService.getCurrentUser(email);
    if (!currentUser) {
      throw new UnauthorizedException();
    }
    return {
      access_token: await this.jwtService.signAsync(payload),
      data: currentUser,
    };
  }
}
