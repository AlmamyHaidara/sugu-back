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
        count: number;
        utilisateurId: number;
        produitId: number;
        boutiqueId: number | null;
        particulierId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCart(boutiqueId: string): Promise<({
        boutiques: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nom: string;
            email: string | null;
            categorie: import("@prisma/client").$Enums.CategorieBoutique;
            location: import("@prisma/client").$Enums.Location;
            img: string | null;
            description: string;
            phone: string | null;
            userId: number;
            countryId: number | null;
        };
        produits: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nom: string;
            img: string;
            description: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            status: import("@prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
        particuliers: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
        };
    } & {
        id: number;
        count: number;
        utilisateurId: number;
        produitId: number;
        boutiqueId: number | null;
        particulierId: number | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getCartByUser(utilisateurId: string): Promise<{
        produits: {
            prixId: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            id?: number;
            nom?: string;
            img?: string;
            description?: string;
            categories?: {
                id: number;
                nom: string;
                description: string | null;
            };
        };
        id: number;
        count: number;
        boutiqueId: number;
        boutiques: {
            id: number;
            nom: string;
            categorie: import("@prisma/client").$Enums.CategorieBoutique;
            img: string;
            description: string;
        };
        particuliers: {
            id: number;
            userId: number;
            utilisateur: {
                id: number;
                nom: string;
                email: string;
                prenom: string;
            };
        };
    }[]>;
    updateCartItem(id: string, updateCartDto: {
        count: number;
    }): Promise<{
        id: number;
        count: number;
        utilisateurId: number;
        produitId: number;
        boutiqueId: number | null;
        particulierId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeFromCart(id: string): Promise<boolean>;
    emptyCart(boutiqueId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
