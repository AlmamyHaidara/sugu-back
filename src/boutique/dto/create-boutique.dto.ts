import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum Location {
  NATIONAL = 'NATIONAL',
  INTERNATIONAL = 'INTERNATIONAL',
}

export enum CategorieBoutique {
  DETAILLANT = 'DETAILLANT',
  GROSSISTE = 'GROSSISTE',
}
export class CreateBoutiqueDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nom: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsEnum(CategorieBoutique)
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  categorie: CategorieBoutique = CategorieBoutique.DETAILLANT;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  description: string;

  @IsEnum(Location)
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  location: Location = Location.NATIONAL;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  phone: string;

  @IsOptional()
  @IsString()
  img?: string;

  @IsNotEmpty()
  @IsString()
  countryId: number;

  @IsNotEmpty()
  userId: number;
}
