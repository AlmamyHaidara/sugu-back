import { CategorieBoutique } from '@prisma/client';
export declare class SearchProduitsDto {
    nom?: string;
    categorieId?: number;
    categorieBoutique?: CategorieBoutique;
    prixMin?: number;
    prixMax?: number;
    countryId?: number;
    location?: string;
    page?: number;
    limit?: number;
}
