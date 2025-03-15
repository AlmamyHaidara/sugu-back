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
        count: number;
        utilisateurId: number;
        produitId: number;
        boutiqueId: number;
    }>;
    getCart(boutiqueId: string): Promise<({
        boutiques: {
            id: number;
            nom: string;
            description: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        };
        produits: {
            id: number;
            nom: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            img: string;
            tags: string;
            categorieId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        count: number;
        utilisateurId: number;
        produitId: number;
        boutiqueId: number;
    })[]>;
    getCartByUser(utilisateurId: string): Promise<{
        produits: any;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        count: number;
        utilisateurId: number;
        produitId: number;
        boutiqueId: number;
    }[]>;
    updateCartItem(id: string, updateCartDto: {
        count: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        count: number;
        utilisateurId: number;
        produitId: number;
        boutiqueId: number;
    }>;
    removeFromCart(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        count: number;
        utilisateurId: number;
        produitId: number;
        boutiqueId: number;
    }>;
    emptyCart(boutiqueId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
