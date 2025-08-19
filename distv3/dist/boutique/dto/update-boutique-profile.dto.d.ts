import { CreateBoutiqueDto } from './create-boutique.dto';
declare const UpdateBoutiqueProfileDto_base: import("@nestjs/mapped-types").MappedType<Omit<CreateBoutiqueDto, "categorie" | "location" | "userId" | "countryId">>;
export declare class UpdateBoutiqueProfileDto extends UpdateBoutiqueProfileDto_base {
    id: number;
}
export {};
