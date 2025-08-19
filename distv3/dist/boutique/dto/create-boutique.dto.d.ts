export declare enum Location {
    NATIONAL = "NATIONAL",
    INTERNATIONAL = "INTERNATIONAL",
    PARTICULIER = "PARTICULIER"
}
export declare enum CategorieBoutique {
    DETAILLANT = "DETAILLANT",
    GROSSISTE = "GROSSISTE"
}
export declare class CreateBoutiqueDto {
    nom: string;
    email: string;
    categorie: CategorieBoutique;
    description: string;
    location: Location;
    phone: string;
    img?: string;
    countryId: number;
    userId: number;
}
