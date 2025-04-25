import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { SearchProduitsDto } from './dto/SearchProduits.dto';
export declare class ProduitController {
    private readonly produitService;
    constructor(produitService: ProduitService);
    create(file: Express.Multer.File, createProduitDto: CreateProduitDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            prixId: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            quantiter: number;
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            Prix: {
                prix: import("@prisma/client/runtime/library").Decimal;
                id: number;
                quantiter: number;
            }[];
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    findAll(query: SearchProduitsDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            categorie: string;
            prix: import("@prisma/client/runtime/library").Decimal;
            boutique: {
                id: number;
                nom: string;
                location: import(".prisma/client").$Enums.Location;
                phone: string;
                categorie: import(".prisma/client").$Enums.CategorieBoutique;
            };
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            Prix: ({
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
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
    }>;
    findAllProductByCountryId(id: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            categorie: string;
            prix: import("@prisma/client/runtime/library").Decimal;
            boutique: {
                id: number;
                nom: string;
                location: import(".prisma/client").$Enums.Location;
                phone: string;
                categorie: import(".prisma/client").$Enums.CategorieBoutique;
            };
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            Prix: ({
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
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findAllByShop(id: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            quantiter: number;
            produitId: number;
            boutiqueId: number;
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findOne(id: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    update(id: number, file: Express.Multer.File, updateProduitDto: UpdateProduitDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            prixId: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            quantiter: number;
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            Prix: {
                prix: import("@prisma/client/runtime/library").Decimal;
                id: number;
                quantiter: number;
            }[];
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    remove(id: number): Promise<{
        message: string;
        data: {
            statusCode: import("@nestjs/common").HttpStatus;
            message: string;
        };
    }>;
    getByShopIdAndUserId(shopId: number, userId: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            nom: string;
            id: number;
            description: string;
            img: string;
            tags: string;
            categorieId: number;
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            prixId: number;
            produits: {
                nom: string;
                id: number;
                description: string;
                img: string;
                tags: string;
                categorieId: number;
                categories: {
                    nom: string;
                    id: number;
                    description: string | null;
                };
            };
            prix: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            updatedAt: Date;
            quantiter: number;
            produitId: number;
            boutiqueId: number | null;
            particularId: number | null;
        }[];
    }>;
    getByShopId(shopId: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            tags: any;
            nom: string;
            id: number;
            description: string;
            img: string;
            categorieId: number;
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            prixId: number;
            produits: {
                nom: string;
                id: number;
                description: string;
                img: string;
                tags: string;
                categorieId: number;
                categories: {
                    nom: string;
                    id: number;
                    description: string | null;
                };
            };
            prix: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            updatedAt: Date;
            quantiter: number;
            produitId: number;
            boutiqueId: number | null;
            particularId: number | null;
        }[];
    }>;
}
