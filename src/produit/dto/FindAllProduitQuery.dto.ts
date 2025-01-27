// produit/dto/find-all-produit-query.dto.ts

import { IsOptional, IsString, IsInt, Min, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllProduitQueryDto {
  // Recherche par nom de produit
  @IsOptional()
  @IsString()
  nom?: string;

  // Filtrer par catégorie (ID)
  @IsOptional()
  @Type(() => Number) // Convertit la query string en number
  @IsInt()
  categorieId?: number;

  // Filtrer par prix min
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  prixMin?: number;

  // Filtrer par prix max
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  prixMax?: number;

  // Filtrer par pays (ID de la table Country, si vous en avez une)
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  countryId?: number;

  // Filtrer par location (enum 'NATIONAL'/'INTERNATIONAL' ou string)
  @IsOptional()
  @IsString()
  location?: string;

  // Pagination : page courante
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number;

  // Pagination : nb d'items par page
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number;
}
