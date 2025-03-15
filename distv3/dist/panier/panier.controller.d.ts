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
        produitId: number;
        boutiqueId: number;
        utilisateurId: number;
        count: number;
    }>;
    getCart(boutiqueId: string): Promise<({
        produits: {
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            img: string;
            tags: string;
            categorieId: number;
        };
        boutiques: {
            nom: string;
            email: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            img: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            phone: string | null;
            userId: number;
            countryId: number | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        produitId: number;
        boutiqueId: number;
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
        createdAt: Date;
        updatedAt: Date;
        produitId: number;
        boutiqueId: number;
        utilisateurId: number;
        count: number;
    }>;
    removeFromCart(id: string): Promise<boolean>;
    emptyCart(boutiqueId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
