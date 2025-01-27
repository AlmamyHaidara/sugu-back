// search-produits.dto.ts
import { IsOptional, IsString, IsInt } from 'class-validator';

export class SearchProduitsDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsInt()
  categorieId?: number;

  @IsOptional()
  @IsInt()
  prixMin?: number;

  @IsOptional()
  @IsInt()
  prixMax?: number;

  @IsOptional()
  @IsInt()
  countryId?: number;

  @IsOptional()
  location?: string; // ou une enum ?

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;
}
