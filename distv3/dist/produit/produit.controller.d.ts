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
            id: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: {
                id: number;
                prix: import("@prisma/client/runtime/library").Decimal;
                quantiter: number;
            }[];
            nom: string;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            status: import("@prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
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
                location: import("@prisma/client").$Enums.Location;
                phone: string;
                categorie: import("@prisma/client").$Enums.CategorieBoutique;
            };
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: ({
                boutiques: {
                    id: number;
                    nom: string;
                    description: string;
                    img: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string | null;
                    categorie: import("@prisma/client").$Enums.CategorieBoutique;
                    location: import("@prisma/client").$Enums.Location;
                    phone: string | null;
                    userId: number;
                    countryId: number | null;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                prix: import("@prisma/client/runtime/library").Decimal;
                quantiter: number;
                boutiqueId: number | null;
                particularId: number | null;
                produitId: number;
            })[];
            id: number;
            nom: string;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            status: import("@prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
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
                location: import("@prisma/client").$Enums.Location;
                phone: string;
                categorie: import("@prisma/client").$Enums.CategorieBoutique;
            };
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: ({
                boutiques: {
                    id: number;
                    nom: string;
                    description: string;
                    img: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string | null;
                    categorie: import("@prisma/client").$Enums.CategorieBoutique;
                    location: import("@prisma/client").$Enums.Location;
                    phone: string | null;
                    userId: number;
                    countryId: number | null;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                prix: import("@prisma/client/runtime/library").Decimal;
                quantiter: number;
                boutiqueId: number | null;
                particularId: number | null;
                produitId: number;
            })[];
            id: number;
            nom: string;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            status: import("@prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
    findAllByShopClient(id: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            boutiques: {
                id: number;
                nom: string;
                categorie: import("@prisma/client").$Enums.CategorieBoutique;
                location: import("@prisma/client").$Enums.Location;
                phone: string;
            };
            id: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            boutiqueId: number | null;
            produitId: number;
            nom: string;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            status: import("@prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
    findAllByShop(id: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            boutiques: {
                id: number;
                nom: string;
                categorie: import("@prisma/client").$Enums.CategorieBoutique;
                location: import("@prisma/client").$Enums.Location;
                phone: string;
            };
            id: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            boutiqueId: number | null;
            produitId: number;
            nom: string;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            status: import("@prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
    findOne(id: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            id: number;
            nom: string;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            status: import("@prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        };
    }>;
    update(id: number, file: Express.Multer.File, updateProduitDto: UpdateProduitDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            prixId: number;
            id: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: {
                id: number;
                prix: import("@prisma/client/runtime/library").Decimal;
                quantiter: number;
            }[];
            nom: string;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            status: import("@prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
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
            id: number;
            nom: string;
            description: string;
            img: string;
            tags: string;
            categorieId: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            prixId: number;
            produits: {
                id: number;
                nom: string;
                description: string;
                img: string;
                tags: string;
                categorieId: number;
                categories: {
                    id: number;
                    nom: string;
                    description: string | null;
                };
            };
            createdAt: Date;
            updatedAt: Date;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            boutiqueId: number | null;
            particularId: number | null;
            produitId: number;
        }[];
    }>;
    getByShopId(shopId: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            tags: any;
            id: number;
            nom: string;
            description: string;
            img: string;
            categorieId: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            prixId: number;
            produits: {
                id: number;
                nom: string;
                description: string;
                img: string;
                tags: string;
                categorieId: number;
                categories: {
                    id: number;
                    nom: string;
                    description: string | null;
                };
            };
            createdAt: Date;
            updatedAt: Date;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            boutiqueId: number | null;
            particularId: number | null;
            produitId: number;
        }[];
    }>;
}
