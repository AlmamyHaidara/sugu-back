import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProduitDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nom: string;

  @IsNotEmpty()
  @IsNumber()
  categorie: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  description: string;

  img: string;
}
