import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePrixDto {
  @IsNotEmpty()
  @IsString()
  prix: string;

  @IsNotEmpty()
  @IsNumber()
  quantiter: number;

  @IsNotEmpty()
  @IsNumber()
  produitId: number;

  @IsNotEmpty()
  @IsNumber()
  boutiqueId: number;
}
