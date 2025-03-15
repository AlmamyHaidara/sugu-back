import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { compare } from 'src/utils/bcrypt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Utilisateur } from '@prisma/client';
import { PrixService } from 'src/prix/prix.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly prixService: PrixService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    this.logger.log('Signing up a new user');
    return this.usersService.create(createUserDto);
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; data: UpdateUserDto; date: string }> {
    try {
      this.logger.log(`Signing in user with email: ${email}`);
      const user = await this.usersService.findOne({ email });
      if (!user) {
        this.logger.warn(`User not found: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await compare(pass, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Invalid password for user: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        sub: user.userId,
        username: user.username,
        roles: user?.profile ? [user.profile.toLowerCase()] : [],
      };

      let currentUser = await this.usersService.getCurrentUser(email);
      if (!currentUser) {
        this.logger.warn(`Current user not found: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const accessToken = await this.jwtService.signAsync(payload);
      const boutique = await this.prixService.findOneByUserId(user?.id);

      if (boutique) {
        currentUser = { ...currentUser, boutique };
      }
      return {
        access_token: accessToken,
        data: currentUser,
        date: new Date().toString(),
      };
    } catch (error) {
      console.error(error);
    }
  }
}
