import { CategorieBoutique } from '@prisma/client';
export declare class FindAllProduitQueryDto {
    nom?: string;
    categorieId?: string;
    categorieBoutique?: CategorieBoutique;
    prixMin?: number;
    prixMax?: number;
    countryId?: number;
    location?: string;
    page?: number;
    limit?: number;
}
