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
            Image: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
                img: string;
            }[];
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
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
            img: Prisma.BatchPayload;
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
            Image: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
                img: string;
            }[];
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
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
            img: Prisma.BatchPayload;
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
            Image: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
                img: string;
            }[];
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            type: import(".prisma/client").$Enums.ProduitType;
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
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findAllByShop(shopId: number, userId?: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            boutiques: {
                nom: string;
                id: number;
                categorie: import(".prisma/client").$Enums.CategorieBoutique;
                location: import(".prisma/client").$Enums.Location;
                phone: string;
            };
            prix: Prisma.Decimal;
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
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
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
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    findByShopId(shopId: number, userId?: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            imgs: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
                img: string;
            }[];
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
            categorieId: number;
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            Image: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
                img: string;
            }[];
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
                tags: string;
                categorieId: number;
                categories: {
                    nom: string;
                    id: number;
                    description: string | null;
                };
                Image: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    produitId: number;
                    img: string;
                }[];
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
            imgs: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
                img: string;
            }[];
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
            img: string | null;
            tags: string | null;
            categorieId: number;
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            Image: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
                img: string;
            }[];
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            type: import(".prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            isPublic: boolean | null;
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
                Image: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    produitId: number;
                    img: string;
                }[];
            } & {
                nom: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.ProduitStatus;
                description: string;
                img: string | null;
                tags: string | null;
                type: import(".prisma/client").$Enums.ProduitType;
                rejectionComment: string | null;
                categorieId: number;
                isPublic: boolean | null;
            };
            prix: Prisma.Decimal;
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
                prix: Prisma.Decimal;
                id: number;
                quantiter: number;
            }[];
            nom: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
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
                    categorie: import(".prisma/client").$Enums.CategorieBoutique;
                    location: import(".prisma/client").$Enums.Location;
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
            Image: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
                img: string;
            }[];
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findAllProduits(query: SearchProduitsDto, userId?: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            imgs: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
                img: string;
            }[];
            categorie: string;
            prix: Prisma.Decimal;
            boutique: {
                id: number;
                nom: string;
                location: import(".prisma/client").$Enums.Location;
                phone: string;
                categorie: import(".prisma/client").$Enums.CategorieBoutique;
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
                    categorie: import(".prisma/client").$Enums.CategorieBoutique;
                    location: import(".prisma/client").$Enums.Location;
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
            Image: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
                img: string;
            }[];
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
    }>;
}
