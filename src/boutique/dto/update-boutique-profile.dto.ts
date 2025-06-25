import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBoutiqueDto } from './create-boutique.dto';

export class UpdateBoutiqueProfileDto extends OmitType(CreateBoutiqueDto,['userId','countryId',"categorie","location"]) {
    id:number
}
