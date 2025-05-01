import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum Profile {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  BOUTIQUIER = 'BOUTIQUIER',
}
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nom: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @IsOptional()
  prenom?: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  telephone: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  profile?: Profile | 'ADMIN' | 'CLIENT' | 'BOUTIQUIER';

  @IsOptional()
  @IsString()
  avatar?: string;

  // @IsDateString()
  // @IsOptional()
  // createdAt?: Date = new Date();

  // @IsDateString()
  // @IsOptional()
  // updatedAt?: Date;
}
