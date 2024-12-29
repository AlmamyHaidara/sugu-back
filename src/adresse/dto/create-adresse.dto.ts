import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAdresseDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nom: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  quartier: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  telephone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  description: string;

  @IsNotEmpty()
  userId: number;
}
