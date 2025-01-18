import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

enum Location {
  NATIONAL = 'NATIONAL',
  INTERNATIONAL = 'INTERNATIONAL',
}

enum CategorieBoutique {
  DETAILLANT = 'DETAILLANT',
  GROSSISTE = 'GROSSISTE',
}
export class CreateBoutiqueDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nom: string;

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

  img: string;

  @IsNotEmpty()
  userId: number;
}
