import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategorieProduitDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nom: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @IsOptional()
  description: string;
}
