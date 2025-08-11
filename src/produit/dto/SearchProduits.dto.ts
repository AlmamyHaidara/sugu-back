import { CategorieBoutique } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  IsNotEmpty,
  MinLength,
  Min,
} from 'class-validator';

export class SearchProduitsDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categorieId?: number;

  @IsOptional()
  @IsEnum(CategorieBoutique)
  categorieBoutique?: CategorieBoutique;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  prixMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  prixMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  countryId?: number;

  @IsOptional()
  @IsString()
  location?: string; // Consider using an enum if applicable

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1; // Default value

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 60; // Default value
}
