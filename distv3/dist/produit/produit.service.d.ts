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
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    createParticular(createProduitDto: CreateProduitDto): Promise<{
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
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    createA(createProduitDto: CreateProduitDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prixId: number;
            tags: any;
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
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            type: import("@prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findAllByShop(shopId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            boutiques: {
                nom: string;
                id: number;
                categorie: import("@prisma/client").$Enums.CategorieBoutique;
                location: import("@prisma/client").$Enums.Location;
                phone: string;
            };
            prix: Prisma.Decimal;
            id: number;
            quantiter: number;
            produitId: number;
            boutiqueId: number | null;
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findOne(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    findByShopId(shopId: number): Promise<{
        statusCode: HttpStatus;
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
            prix: Prisma.Decimal;
            createdAt: Date;
            updatedAt: Date;
            quantiter: number;
            produitId: number;
            boutiqueId: number | null;
            particularId: number | null;
        }[];
    }>;
    findByUserIdAndShopId(shopId: number, userId: number): Promise<{
        statusCode: HttpStatus;
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
            prix: Prisma.Decimal;
            createdAt: Date;
            updatedAt: Date;
            quantiter: number;
            produitId: number;
            boutiqueId: number | null;
            particularId: number | null;
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
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
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
                location: import("@prisma/client").$Enums.Location;
                phone: string;
                categorie: import("@prisma/client").$Enums.CategorieBoutique;
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
                    categorie: import("@prisma/client").$Enums.CategorieBoutique;
                    location: import("@prisma/client").$Enums.Location;
                    phone: string | null;
                    userId: number;
                    countryId: number | null;
                };
            } & {
                prix: Prisma.Decimal;
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
            status: import("@prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
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
                location: import("@prisma/client").$Enums.Location;
                phone: string;
                categorie: import("@prisma/client").$Enums.CategorieBoutique;
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
                    categorie: import("@prisma/client").$Enums.CategorieBoutique;
                    location: import("@prisma/client").$Enums.Location;
                    phone: string | null;
                    userId: number;
                    countryId: number | null;
                };
            } & {
                prix: Prisma.Decimal;
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
            status: import("@prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: import("@prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
    }>;
}
