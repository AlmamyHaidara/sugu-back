import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { SearchProduitsDto } from './dto/SearchProduits.dto';
export declare class ProduitController {
    private readonly produitService;
    constructor(produitService: ProduitService);
    create(file: Express.Multer.File, createProduitDto: CreateProduitDto): Promise<{
        message: string;
        data: {
            statusCode: import("@nestjs/common").HttpStatus;
            message: string;
            data: {
                Prix: {
                    prix: import("@prisma/client/runtime/library").Decimal;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    quantiter: number;
                    boutiqueId: number;
                    produitId: number;
                }[];
                categories: {
                    nom: string;
                    id: number;
                    description: string | null;
                };
            } & {
                nom: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                tags: string[];
                img: string;
                categorieId: number;
            };
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
            Prix: ({
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
                prix: import("@prisma/client/runtime/library").Decimal;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                quantiter: number;
                boutiqueId: number;
                produitId: number;
            })[];
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
        totalCount: number;
        currentPage: number;
        totalPages: number;
    }>;
    findAllByShop(id: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            quantiter: number;
            boutiqueId: number;
            produitId: number;
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            tags: string[];
            img: string;
            categorieId: number;
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
            description: string;
            tags: string[];
            img: string;
            categorieId: number;
        };
    }>;
    update(id: number, file: Express.Multer.File, updateProduitDto: UpdateProduitDto): Promise<{
        message: string;
        data: {
            statusCode: import("@nestjs/common").HttpStatus;
            message: string;
            data: {
                nom: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                tags: string[];
                img: string;
                categorieId: number;
            };
        };
    }>;
    remove(id: number): Promise<{
        message: string;
        data: {
            statusCode: import("@nestjs/common").HttpStatus;
            message: string;
        };
    }>;
}
