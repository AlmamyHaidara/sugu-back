import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BoutiqueService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createBoutiqueDto: CreateBoutiqueDto): Promise<{
        statusCode: number;
        data: {
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
    }>;
    findAllShopAndProducts(): Promise<{
        statusCode: number;
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
        }[];
        products: {
            categorie: string;
            prix: import("@prisma/client/runtime/library").Decimal;
            boutiqueId: number;
            Prix: {
                prix: import("@prisma/client/runtime/library").Decimal;
                boutiqueId: number;
            }[];
            categories: {
                nom: string;
            };
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            tags: string[];
            img: string;
            categorieId: number;
        }[];
    }>;
    findAllShopWithProducts(shopId: number): Promise<{
        statusCode: number;
        data: {
            categorie: string;
            produitId: number;
            boutiqueId: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            tags: string[];
            img: string;
            categorieId: number;
        }[];
    }>;
    findAllShopByUser(userId: number): Promise<{
        statusCode: number;
        data: {
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
        }[];
    }>;
    findAll(): Promise<{
        statusCode: number;
        data: {
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
        }[];
    }>;
    findOne(id: number): Promise<{
        statusCode: number;
        data: {
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
    }>;
    update(id: number, updateBoutiqueDto: UpdateBoutiqueDto): Promise<{
        statusCode: number;
        data: {
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
    }>;
    remove(id: number): Promise<{
        statusCode: number;
        data: {
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
    }>;
}
