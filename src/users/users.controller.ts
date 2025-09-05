import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { Express } from 'express';
import { Public } from 'src/auth/constants';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const findOneById = await this.userService.findOneById(id);
    return {
      message: '',
      data: findOneById,
    };
  }

  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/user',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `avatar-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new Error('Seuls les fichiers JPG, JPEG et PNG sont autorisés !'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File, // <-- Récupérer le nouveau fichier
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto, file);
    return {
      ...updatedUser,
    };
  }

  @Public()
  @Put('change-password')
  async changePassword(@Body() request: { email: string; password: string }) {
    return this.userService.changePassword(request);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.remove(id);
    if (!result) {
      return {
        message: 'Error deleting the user',
        status: 500,
      };
    }
    return {
      message: `Deleting the user #${id}`,
      status: 200,
    };
  }
}
