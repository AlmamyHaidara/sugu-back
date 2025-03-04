import { PrismaService } from 'src/prisma/prisma.service';
export declare class PanierService {
    private prisma;
    constructor(prisma: PrismaService);
    addToCart(data: {
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
    getCart(boutiqueId: number): Promise<({
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
    getCartByUser(utilisateurId: number): Promise<{
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
    updateCartItem(id: number, count: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        boutiqueId: number;
        produitId: number;
        count: number;
        utilisateurId: number;
    }>;
    removeFromCart(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        boutiqueId: number;
        produitId: number;
        count: number;
        utilisateurId: number;
    }>;
    emptyCart(boutiqueId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
