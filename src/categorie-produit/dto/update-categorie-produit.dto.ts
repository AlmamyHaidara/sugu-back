import { PartialType } from '@nestjs/mapped-types';
import { CreateCategorieProduitDto } from './create-categorie-produit.dto';

export class UpdateCategorieProduitDto extends PartialType(
  CreateCategorieProduitDto,
) {
  id: number;
}
