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
            nom: string;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            description: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            countryId: number | null;
        };
    }>;
    findAll(req: Request): Promise<{
        statusCode: number;
        data: ({
            country: {
                createdAt: Date;
                updatedAt: Date | null;
                id: number;
                name: string;
                isoCode: string | null;
            };
            Prix: ({
                produits: {
                    Favorie: {
                        createdAt: Date;
                        updatedAt: Date;
                        id: number;
                        userId: number | null;
                        produitId: number | null;
                    }[];
                } & {
                    nom: string;
                    img: string;
                    description: string;
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    tags: string | null;
                    type: import(".prisma/client").$Enums.ProduitType;
                    status: import(".prisma/client").$Enums.ProduitStatus;
                    rejectionComment: string | null;
                    categorieId: number;
                    isPublic: boolean | null;
                };
            } & {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                prix: import("@prisma/client/runtime/library").Decimal;
                quantiter: number;
                produitId: number;
                boutiqueId: number | null;
                particularId: number | null;
            })[];
        } & {
            nom: string;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            description: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            countryId: number | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        statusCode: number;
        data: {
            nom: string;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            description: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
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
    findAllWithProducts(req: Request): Promise<{
        statusCode: number;
        boutiques: ({
            country: {
                createdAt: Date;
                updatedAt: Date | null;
                id: number;
                name: string;
                isoCode: string | null;
            };
        } & {
            nom: string;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            description: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
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
            Favorie: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                userId: number | null;
                produitId: number | null;
            }[];
            categories: {
                nom: string;
            };
            nom: string;
            img: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findBoutiqueProduit(req: Request, id: number): Promise<{
        statusCode: number;
        data: {
            categorie: string;
            produitId: number;
            boutiqueId: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            Favorie: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                userId: number | null;
                produitId: number | null;
            }[];
            categories: {
                nom: string;
                description: string | null;
                id: number;
            };
            nom: string;
            img: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
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
            nom: string;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            description: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            countryId: number | null;
        }[];
    }>;
    update(file: Express.Multer.File, id: number, updateBoutiqueDto: UpdateBoutiqueDto): Promise<{
        message: string;
        data: {
            statusCode: number;
            data: {
                nom: string;
                email: string | null;
                categorie: import(".prisma/client").$Enums.CategorieBoutique;
                location: import(".prisma/client").$Enums.Location;
                img: string | null;
                description: string;
                phone: string | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                userId: number;
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
