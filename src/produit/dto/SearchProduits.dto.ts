// search-produits.dto.ts
import { CategorieBoutique } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class SearchProduitsDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categorieId?: number;

  // Filtrer par catégorie de botuique
  @IsOptional()
  @IsEnum(CategorieBoutique)
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  categorieBoutique?: CategorieBoutique;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  prixMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  prixMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  countryId?: number;

  @IsOptional()
  location?: string; // ou une enum ?

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;
}

/**
 * // search-produits.dto.ts
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class SearchProduitsDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  categorieId?: string;

  @IsOptional()
  @IsString()
  prixMin?: string;

  @IsOptional()
  @IsString()
  prixMax?: string;

  @IsOptional()
  @IsString()
  countryId?: string;

  @IsOptional()
  location?: string; // ou une enum ?

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;
}

 */
