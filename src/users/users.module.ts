import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { UsersController } from './users.controller';

@Module({
  imports: [
    UsersModule,

    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  controllers: [UsersController, UsersController],
})
export class UsersModule {}
