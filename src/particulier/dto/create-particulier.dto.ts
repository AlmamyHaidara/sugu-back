import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateParticulierDto {
  // @IsString()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  userId: number;
  // produitId: number;
  // @IsString()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  quantiter: number;
  // @IsString()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  prix: number;
  @IsString()
  prodName: string;
  @IsString()
  prodDescription: string;

  prodImg: string[];

  @Transform(({ value }) => Boolean(value), { toClassOnly: true })
  @IsBoolean()
  published: boolean;

  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  categorieId: number;
}
