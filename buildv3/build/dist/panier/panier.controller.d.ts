import { PanierService } from './panier.service';
export declare class PanierController {
    private readonly panierService;
    constructor(panierService: PanierService);
    addToCart(addToCartDto: {
        utilisateurId: number;
        produitId: number;
        boutiqueId: number;
        count: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        boutiqueId: number;
        produitId: number;
        count: number;
        utilisateurId: number;
    }>;
    getCart(boutiqueId: string): Promise<({
        produits: {
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            tags: string[];
            img: string;
            categorieId: number;
        };
        boutiques: {
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            description: string;
            img: string | null;
            countryId: number | null;
            location: import(".prisma/client").$Enums.Location;
            phone: string | null;
            userId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        boutiqueId: number;
        produitId: number;
        count: number;
        utilisateurId: number;
    })[]>;
    getCartByUser(utilisateurId: string): Promise<{
        produits: {
            prixId: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            nom?: string;
            id?: number;
            description?: string;
            img?: string;
            categories?: {
                nom: string;
                id: number;
                description: string | null;
            };
        };
        id: number;
        boutiques: {
            nom: string;
            id: number;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            description: string;
            img: string;
        };
        boutiqueId: number;
        count: number;
    }[]>;
    updateCartItem(id: string, updateCartDto: {
        count: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        boutiqueId: number;
        produitId: number;
        count: number;
        utilisateurId: number;
    }>;
    removeFromCart(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        boutiqueId: number;
        produitId: number;
        count: number;
        utilisateurId: number;
    }>;
    emptyCart(boutiqueId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
