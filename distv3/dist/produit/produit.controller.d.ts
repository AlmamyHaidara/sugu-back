import { HttpStatus } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { SearchProduitsDto } from './dto/SearchProduits.dto';
import { $Enums } from '@prisma/client';
export declare class ProduitController {
    private readonly produitService;
    constructor(produitService: ProduitService);
    create(file: Express.Multer.File, createProduitDto: CreateProduitDto): Promise<{
        statusCode: HttpStatus;
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
            status: $Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: $Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    findAll(req: Request, query: SearchProduitsDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            categorie: string;
            prix: import("@prisma/client/runtime/library").Decimal;
            boutique: {
                id: number;
                nom: string;
                location: $Enums.Location;
                phone: string;
                categorie: $Enums.CategorieBoutique;
            };
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
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
                    categorie: $Enums.CategorieBoutique;
                    location: $Enums.Location;
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
            status: $Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: $Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
    }>;
    findAllProductByCountryId(req: Request, id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            categorie: string;
            prix: import("@prisma/client/runtime/library").Decimal;
            boutique: {
                id: number;
                nom: string;
                location: $Enums.Location;
                phone: string;
                categorie: $Enums.CategorieBoutique;
            };
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
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
                    categorie: $Enums.CategorieBoutique;
                    location: $Enums.Location;
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
            status: $Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: $Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findAllByShopClient(req: Request, id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            boutiques: {
                nom: string;
                id: number;
                categorie: $Enums.CategorieBoutique;
                location: $Enums.Location;
                phone: string;
            };
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            quantiter: number;
            produitId: number;
            boutiqueId: number | null;
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            status: $Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: $Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findAllByShop(req: Request, id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            boutiques: {
                nom: string;
                id: number;
                categorie: $Enums.CategorieBoutique;
                location: $Enums.Location;
                phone: string;
            };
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            quantiter: number;
            produitId: number;
            boutiqueId: number | null;
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            status: $Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: $Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findOne(req: Request, id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: $Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: $Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    update(id: number, file: Express.Multer.File, updateProduitDto: UpdateProduitDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prixId: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            quantiter: number;
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
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
            status: $Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            type: $Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    remove(id: number): Promise<{
        message: string;
        data: {
            statusCode: HttpStatus;
            message: string;
        };
    }>;
    getByShopIdAndUserId(shopId: number, userId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            nom: string;
            id: number;
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
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
                Favorie: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    produitId: number | null;
                    userId: number | null;
                }[];
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
    getByShopId(req: Request, shopId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            tags: any;
            nom: string;
            id: number;
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
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
                Favorie: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    produitId: number | null;
                    userId: number | null;
                }[];
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
