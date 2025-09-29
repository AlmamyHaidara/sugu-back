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
            id: number;
            prix: Prisma.Decimal;
            quantiter: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: {
                id: number;
                prix: Prisma.Decimal;
                quantiter: number;
            }[];
            Image: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
            }[];
            nom: string;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        };
    }>;
    createParticular(createProduitDto: CreateProduitDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prixId: number;
            img: Prisma.BatchPayload;
            id: number;
            prix: Prisma.Decimal;
            quantiter: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: {
                id: number;
                prix: Prisma.Decimal;
                quantiter: number;
            }[];
            Image: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
            }[];
            nom: string;
            description: string;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        };
    }>;
    createA(createProduitDto: CreateProduitDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prixId: number;
            tags: any;
            img: Prisma.BatchPayload;
            id: number;
            prix: Prisma.Decimal;
            quantiter: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: {
                id: number;
                prix: Prisma.Decimal;
                quantiter: number;
            }[];
            Image: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
            }[];
            nom: string;
            description: string;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        };
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            nom: string;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
    findAllByShop(shopId: number, userId?: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            boutiques: {
                id: number;
                nom: string;
                categorie: import(".prisma/client").$Enums.CategorieBoutique;
                location: import(".prisma/client").$Enums.Location;
                phone: string;
            };
            id: number;
            prix: Prisma.Decimal;
            quantiter: number;
            boutiqueId: number | null;
            produitId: number;
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
            nom: string;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
    findOne(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            nom: string;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        };
    }>;
    findByShopId(shopId: number, userId?: number): Promise<{
        statusCode: HttpStatus;
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
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
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
                Favorie: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    produitId: number | null;
                    userId: number | null;
                }[];
            };
            createdAt: Date;
            updatedAt: Date;
            prix: Prisma.Decimal;
            quantiter: number;
            boutiqueId: number | null;
            particularId: number | null;
            produitId: number;
        }[];
    }>;
    findByUserIdAndShopId(shopId: number, userId: number): Promise<{
        statusCode: HttpStatus;
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
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
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
                Favorie: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    produitId: number | null;
                    userId: number | null;
                }[];
            };
            createdAt: Date;
            updatedAt: Date;
            prix: Prisma.Decimal;
            quantiter: number;
            boutiqueId: number | null;
            particularId: number | null;
            produitId: number;
        }[];
    }>;
    update(id: number, updateProduitDto: UpdateProduitDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prixId: number;
            id: number;
            prix: Prisma.Decimal;
            quantiter: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: {
                id: number;
                prix: Prisma.Decimal;
                quantiter: number;
            }[];
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
            nom: string;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        };
    }>;
    remove(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    findAllProduitsByCountryId(countryId: number, userId?: number): Promise<{
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
                    categorie: import(".prisma/client").$Enums.CategorieBoutique;
                    location: import(".prisma/client").$Enums.Location;
                    phone: string | null;
                    userId: number;
                    countryId: number | null;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                prix: Prisma.Decimal;
                quantiter: number;
                boutiqueId: number | null;
                particularId: number | null;
                produitId: number;
            })[];
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
            id: number;
            nom: string;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
    findAllProduits(query: SearchProduitsDto, userId?: number): Promise<{
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
                    categorie: import(".prisma/client").$Enums.CategorieBoutique;
                    location: import(".prisma/client").$Enums.Location;
                    phone: string | null;
                    userId: number;
                    countryId: number | null;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                prix: Prisma.Decimal;
                quantiter: number;
                boutiqueId: number | null;
                particularId: number | null;
                produitId: number;
            })[];
            Favorie: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number | null;
                userId: number | null;
            }[];
            id: number;
            nom: string;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
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
}
