import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateProduitDto {
 @IsNotEmpty()
   @IsString()
   @MinLength(2)
   nom: string;
 

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  categorie: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  description: string;

  img: string;


}
