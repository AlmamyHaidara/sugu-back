import { BoutiqueService } from './boutique.service';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { UpdateBoutiqueProfileDto } from './dto/update-boutique-profile.dto';
export declare class BoutiqueController {
    private readonly boutiqueService;
    constructor(boutiqueService: BoutiqueService);
    create(file: Express.Multer.File, createBoutiqueDto: CreateBoutiqueDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            id: number;
            nom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
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
            Prix: ({
                produits: {
                    id: number;
                    nom: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string;
                    img: string;
                    tags: string | null;
                    type: import(".prisma/client").$Enums.ProduitType;
                    status: import(".prisma/client").$Enums.ProduitStatus;
                    rejectionComment: string | null;
                    categorieId: number;
                    isPublic: boolean | null;
                };
            } & {
                prix: import("@prisma/client/runtime/library").Decimal;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                quantiter: number;
                produitId: number;
                boutiqueId: number | null;
                particularId: number | null;
            })[];
        } & {
            id: number;
            nom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        statusCode: number;
        data: {
            id: number;
            nom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
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
            nom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        })[];
        products: {
            categorie: string;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            boutiqueId: number;
            Prix: {
                prix: import("@prisma/client/runtime/library").Decimal;
                quantiter: number;
                boutiqueId: number;
            }[];
            categories: {
                nom: string;
            };
            id: number;
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            img: string;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findBoutiqueProduit(id: number): Promise<{
        statusCode: number;
        data: {
            categorie: string;
            produitId: number;
            boutiqueId: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            id: number;
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            img: string;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findBoutiqueByUserId(userId: number): Promise<{
        statusCode: number;
        data: {
            id: number;
            nom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        }[];
    }>;
    update(file: Express.Multer.File, id: number, updateBoutiqueDto: UpdateBoutiqueDto): Promise<{
        message: string;
        data: {
            statusCode: number;
            data: {
                id: number;
                nom: string;
                email: string | null;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                userId: number;
                categorie: import(".prisma/client").$Enums.CategorieBoutique;
                location: import(".prisma/client").$Enums.Location;
                img: string | null;
                phone: string | null;
                countryId: number | null;
            };
        };
    }>;
    updateProfile(id: number, updateBoutiqueDto: UpdateBoutiqueProfileDto, file: Express.Multer.File): Promise<{
        message: string;
        data: {
            statusCode: number;
            data: any;
        };
    }>;
    remove(id: number): Promise<{
        message: string;
        data: {
            statusCode: number;
            data: import(".prisma/client").Prisma.BatchPayload;
        };
    }>;
}
