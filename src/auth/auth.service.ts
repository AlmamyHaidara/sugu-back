import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { compare } from 'src/utils/bcrypt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Signs up a new user.
   *
   * @param {CreateUserDto} createUserDto - The data transfer object containing the details of the user to be created.
   * @returns {Promise<any>} - The created user.
   */
  async signUp(createUserDto: CreateUserDto) {
    this.logger.log('Signing up a new user');
    return this.usersService.create(createUserDto);
  }

  /**
   * Signs in a user and returns an access token.
   *
   * @param {string} email - The email of the user.
   * @param {string} pass - The password of the user.
   * @returns {Promise<{ access_token: string; data: UpdateUserDto }>} - The access token and user data.
   * @throws {UnauthorizedException} - Throws an unauthorized exception if the credentials are invalid.
   */
  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; data: UpdateUserDto }> {
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

    const payload = { sub: user.userId, username: user.username };
    const currentUser = await this.usersService.getCurrentUser(email);
    if (!currentUser) {
      this.logger.warn(`Current user not found: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync(payload);
    return {
      access_token: accessToken,
      data: currentUser,
    };
  }
}
