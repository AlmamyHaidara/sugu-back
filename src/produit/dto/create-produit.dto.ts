import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProduitDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nom: string;

  @IsNotEmpty()
  @IsString()
  categorie: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  description: string;

  img: string;

  @IsNotEmpty()
  @IsString()
  prix: string;

  @IsNotEmpty()
  @IsString()
  quantiter: string;

  @IsNotEmpty()
  @IsString()
  tags: string;

  @IsNotEmpty()
  @IsString()
  boutique: string;
}
