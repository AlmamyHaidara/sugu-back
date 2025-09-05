import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { compare } from 'src/utils/bcrypt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { PrixService } from 'src/prix/prix.service';
import { PasswordUpdate } from './constants';

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

  async updatePassword(createUserDto: PasswordUpdate) {
    this.logger.log('Signing up a new user');
    return this.usersService.passwordUpdate(
      createUserDto.userId,
      createUserDto.newPassword,
      createUserDto.currentPassword,
    );
  }

  passwordForget(email: string) {
    this.logger.log(`Password reset requested for email: ${email}`);
    return this.usersService.passwordForget(email);
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

  async changePassword(request: { email: string; password: string }) {
    return this.usersService.changePassword(request);
  }
  async refreshToken(
    email: string,
  ): Promise<{ access_token: string; data: UpdateUserDto; date: string }> {
    try {
      this.logger.log(`Refreshing token for user ID: ${email}`);
      const user = await this.usersService.findOne({ email: email });

      if (!user) {
        this.logger.warn(`User not found for refresh token: ${email}`);
        throw new UnauthorizedException('User not found');
      }

      const payload = {
        sub: user.userId,
        username: user.username,
        roles: user?.profile ? [user.profile.toLowerCase()] : [],
      };

      let currentUser = await this.usersService.getCurrentUser(user.email);
      if (!currentUser) {
        this.logger.warn(`Current user not found for refresh: ${user.email}`);
        throw new UnauthorizedException('User not found');
      }

      const accessToken = await this.jwtService.signAsync(payload);

      const boutique =
        user?.profile === 'BOUTIQUIER'
          ? await this.prixService.findOneByUserId(user?.id)
          : null;

      if (boutique) {
        currentUser = { ...currentUser, boutique };
      }

      return {
        access_token: accessToken,
        data: currentUser,
        date: new Date().toString(),
      };
    } catch (error) {
      this.logger.error(`Error refreshing token: ${error.message}`);
      throw new UnauthorizedException('Failed to refresh token');
    }
  }
}
