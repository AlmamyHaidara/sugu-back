import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePublicityDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  titre: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pourcentage: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dateFin: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dateDebut: Date;

  @IsOptional()
  img?: string;
}
