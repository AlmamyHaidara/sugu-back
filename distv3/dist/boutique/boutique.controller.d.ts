import { BoutiqueService } from './boutique.service';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
export declare class BoutiqueController {
    private readonly boutiqueService;
    constructor(boutiqueService: BoutiqueService);
    create(file: Express.Multer.File, createBoutiqueDto: CreateBoutiqueDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nom: string;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            description: string;
            phone: string | null;
            userId: number;
            countryId: number | null;
        };
    }>;
    findAll(): Promise<{
        statusCode: number;
        data: ({
            country: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                isoCode: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nom: string;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            description: string;
            phone: string | null;
            userId: number;
            countryId: number | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        statusCode: number;
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nom: string;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            description: string;
            phone: string | null;
            userId: number;
            countryId: number | null;
        };
    }>;
    getStatistic(id: number): Promise<{
        statusCode: number;
        data: {
            sales: {
                total: any;
                daily: number[];
            };
            orders: {
                pending: number;
                shipped: number;
                delivered: number;
                cancelled: number;
            };
            revenue: {
                total: any;
                monthly: any[];
            };
        };
    }>;
    findAllWithProducts(): Promise<{
        statusCode: number;
        boutiques: ({
            country: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                isoCode: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nom: string;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            description: string;
            phone: string | null;
            userId: number;
            countryId: number | null;
        })[];
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
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nom: string;
            img: string;
            description: string;
            tags: string;
            categorieId: number;
        }[];
    }>;
    findBoutiqueProduit(id: number): Promise<{
        statusCode: number;
        data: {
            categorie: string;
            produitId: number;
            boutiqueId: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nom: string;
            img: string;
            description: string;
            tags: string;
            categorieId: number;
        }[];
    }>;
    findBoutiqueByUserId(userId: number): Promise<{
        statusCode: number;
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nom: string;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            description: string;
            phone: string | null;
            userId: number;
            countryId: number | null;
        }[];
    }>;
    update(id: number, updateBoutiqueDto: UpdateBoutiqueDto, file: Express.Multer.File): Promise<{
        message: string;
        data: {
            statusCode: number;
            data: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                nom: string;
                email: string | null;
                categorie: import(".prisma/client").$Enums.CategorieBoutique;
                location: import(".prisma/client").$Enums.Location;
                img: string | null;
                description: string;
                phone: string | null;
                userId: number;
                countryId: number | null;
            };
        };
    }>;
    remove(id: number): Promise<{
        message: string;
        data: {
            statusCode: number;
            data: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                nom: string;
                email: string | null;
                categorie: import(".prisma/client").$Enums.CategorieBoutique;
                location: import(".prisma/client").$Enums.Location;
                img: string | null;
                description: string;
                phone: string | null;
                userId: number;
                countryId: number | null;
            };
        };
    }>;
}
