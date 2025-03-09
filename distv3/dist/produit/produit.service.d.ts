import { HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { SearchProduitsDto } from './dto/SearchProduits.dto';
import { Prisma } from '@prisma/client';
export declare class ProduitService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProduitDto: CreateProduitDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prixId: number;
            prix: Prisma.Decimal;
            id: number;
            quantiter: number;
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            Prix: {
                prix: Prisma.Decimal;
                id: number;
                quantiter: number;
            }[];
            nom: string;
            description: string;
            img: string;
            tags: string[];
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            nom: string;
            id: number;
            description: string;
            img: string;
            tags: string[];
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findAllByShop(shopId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prix: Prisma.Decimal;
            id: number;
            quantiter: number;
            produitId: number;
            boutiqueId: number;
            nom: string;
            description: string;
            img: string;
            tags: string[];
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            nom: string;
            id: number;
            description: string;
            img: string;
            tags: string[];
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findByUserIdAndShopId(shopId: number, userId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            nom: string;
            id: number;
            description: string;
            img: string;
            tags: string[];
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
                tags: string[];
                categorieId: number;
                categories: {
                    nom: string;
                    id: number;
                    description: string | null;
                };
            };
            prix: Prisma.Decimal;
            quantiter: number;
            produitId: number;
            boutiqueId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    update(id: number, updateProduitDto: UpdateProduitDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prixId: number;
            prix: Prisma.Decimal;
            id: number;
            quantiter: number;
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            Prix: {
                prix: Prisma.Decimal;
                id: number;
                quantiter: number;
            }[];
            nom: string;
            description: string;
            img: string;
            tags: string[];
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    findAllProduitsByCountryId(countryId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            categorie: string;
            prix: Prisma.Decimal;
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
                    description: string;
                    img: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    categorie: import(".prisma/client").$Enums.CategorieBoutique;
                    location: import(".prisma/client").$Enums.Location;
                    phone: string | null;
                    userId: number;
                    countryId: number | null;
                };
            } & {
                prix: Prisma.Decimal;
                id: number;
                quantiter: number;
                produitId: number;
                boutiqueId: number;
                createdAt: Date;
                updatedAt: Date;
            })[];
            nom: string;
            id: number;
            description: string;
            img: string;
            tags: string[];
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findAllProduits(query: SearchProduitsDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            categorie: string;
            prix: Prisma.Decimal;
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
                    description: string;
                    img: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    categorie: import(".prisma/client").$Enums.CategorieBoutique;
                    location: import(".prisma/client").$Enums.Location;
                    phone: string | null;
                    userId: number;
                    countryId: number | null;
                };
            } & {
                prix: Prisma.Decimal;
                id: number;
                quantiter: number;
                produitId: number;
                boutiqueId: number;
                createdAt: Date;
                updatedAt: Date;
            })[];
            nom: string;
            id: number;
            description: string;
            img: string;
            tags: string[];
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
    }>;
}
