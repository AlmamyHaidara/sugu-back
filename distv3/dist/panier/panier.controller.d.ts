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
        produitId: number;
        boutiqueId: number;
        createdAt: Date;
        updatedAt: Date;
        utilisateurId: number;
        count: number;
    }>;
    getCart(boutiqueId: string): Promise<({
        produits: {
            nom: string;
            id: number;
            description: string;
            img: string;
            tags: string[];
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
        };
        boutiques: {
            nom: string;
            email: string | null;
            id: number;
            description: string;
            img: string | null;
            createdAt: Date;
            updatedAt: Date;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            phone: string | null;
            userId: number;
            countryId: number | null;
        };
    } & {
        id: number;
        produitId: number;
        boutiqueId: number;
        createdAt: Date;
        updatedAt: Date;
        utilisateurId: number;
        count: number;
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
        boutiqueId: number;
        boutiques: {
            nom: string;
            id: number;
            description: string;
            img: string;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
        };
        count: number;
    }[]>;
    updateCartItem(id: string, updateCartDto: {
        count: number;
    }): Promise<{
        id: number;
        produitId: number;
        boutiqueId: number;
        createdAt: Date;
        updatedAt: Date;
        utilisateurId: number;
        count: number;
    }>;
    removeFromCart(id: string): Promise<boolean>;
    emptyCart(boutiqueId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
