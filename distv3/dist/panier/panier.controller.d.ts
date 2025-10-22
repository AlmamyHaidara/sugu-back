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
        boutiqueId: number | null;
        utilisateurId: number;
        count: number;
        particulierId: number | null;
    }>;
    getCart(boutiqueId: string): Promise<({
        produits: {
            Image: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
                img: string;
            }[];
        } & {
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
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
        particuliers: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        produitId: number;
        boutiqueId: number | null;
        utilisateurId: number;
        count: number;
        particulierId: number | null;
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
            Image?: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
                img: string;
            }[];
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
        particuliers: {
            utilisateur: {
                nom: string;
                prenom: string;
                email: string;
                id: number;
            };
            id: number;
            userId: number;
        };
    }[]>;
    updateCartItem(id: string, updateCartDto: {
        count: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        produitId: number;
        boutiqueId: number | null;
        utilisateurId: number;
        count: number;
        particulierId: number | null;
    }>;
    removeFromCart(id: string): Promise<boolean>;
    emptyCart(boutiqueId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
