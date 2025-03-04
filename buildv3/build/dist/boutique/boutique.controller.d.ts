import { BoutiqueService } from './boutique.service';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
export declare class BoutiqueController {
    private readonly boutiqueService;
    constructor(boutiqueService: BoutiqueService);
    create(file: Express.Multer.File, createBoutiqueDto: CreateBoutiqueDto): Promise<{
        message: string;
        data: {
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
        };
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
    findAllWithProducts(): Promise<{
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
    findBoutiqueProduit(id: number): Promise<{
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
    findBoutiqueByUserId(userId: number): Promise<{
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
    update(id: number, updateBoutiqueDto: UpdateBoutiqueDto, file: Express.Multer.File): Promise<{
        message: string;
        data: {
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
        };
    }>;
    remove(id: number): Promise<{
        message: string;
        data: {
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
        };
    }>;
}
