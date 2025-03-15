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
        count: number;
        utilisateurId: number;
        produitId: number;
        boutiqueId: number;
    }>;
    getCart(boutiqueId: number): Promise<({
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
    getCartByUser(utilisateurId: number): Promise<{
        produits: any;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        count: number;
        utilisateurId: number;
        produitId: number;
        boutiqueId: number;
    }[]>;
    updateCartItem(id: number, count: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        count: number;
        utilisateurId: number;
        produitId: number;
        boutiqueId: number;
    }>;
    removeFromCart(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        count: number;
        utilisateurId: number;
        produitId: number;
        boutiqueId: number;
    }>;
    emptyCart(boutiqueId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
