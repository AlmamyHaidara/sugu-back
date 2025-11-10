import { HttpStatus } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { SearchProduitsDto } from './dto/SearchProduits.dto';
import { $Enums } from '@prisma/client';
export declare class ProduitController {
    private readonly produitService;
    constructor(produitService: ProduitService);
    create(files: Array<Express.Multer.File>, createProduitDto: CreateProduitDto): Promise<{
        statusCode: HttpStatus;
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
            type: $Enums.ProduitType;
            status: $Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        };
    }>;
    findAll(req: Request, query: SearchProduitsDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            imgs: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
            }[];
            categorie: string;
            prix: import("@prisma/client/runtime/library").Decimal;
            boutique: {
                id: number;
                nom: string;
                location: $Enums.Location;
                phone: string;
                categorie: $Enums.CategorieBoutique;
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
                    categorie: $Enums.CategorieBoutique;
                    location: $Enums.Location;
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
            Image: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
            }[];
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
            type: $Enums.ProduitType;
            status: $Enums.ProduitStatus;
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
                    categorie: $Enums.CategorieBoutique;
                    location: $Enums.Location;
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
            Image: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
            }[];
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
            type: $Enums.ProduitType;
            status: $Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
    findAllByShopClient(req: Request, id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            boutiques: {
                id: number;
                nom: string;
                categorie: $Enums.CategorieBoutique;
                location: $Enums.Location;
                phone: string;
            };
            id: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            boutiqueId: number | null;
            produitId: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Image: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
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
            type: $Enums.ProduitType;
            status: $Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
    findAllByShop(req: Request, id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            boutiques: {
                id: number;
                nom: string;
                categorie: $Enums.CategorieBoutique;
                location: $Enums.Location;
                phone: string;
            };
            id: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            boutiqueId: number | null;
            produitId: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Image: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
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
            type: $Enums.ProduitType;
            status: $Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
    findOne(req: Request, id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            nom: string;
            description: string;
            img: string | null;
            tags: string | null;
            type: $Enums.ProduitType;
            status: $Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        };
    }>;
    update(id: number, files: Array<Express.Multer.File>, updateProduitDto: UpdateProduitDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            prixId: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                prix: import("@prisma/client/runtime/library").Decimal;
                quantiter: number;
                boutiqueId: number | null;
                particularId: number | null;
                produitId: number;
            }[];
            Image: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
            }[];
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
            type: $Enums.ProduitType;
            status: $Enums.ProduitStatus;
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
            statusCode: HttpStatus;
            message: string;
        };
    }>;
    getByShopIdAndUserId(shopId: number, userId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            imgs: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
            }[];
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Image: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
            }[];
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
            type: $Enums.ProduitType;
            status: $Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
            prixId: number;
            produits: {
                categories: {
                    id: number;
                    nom: string;
                    description: string | null;
                };
                Image: {
                    id: number;
                    img: string;
                    createdAt: Date;
                    updatedAt: Date;
                    produitId: number;
                }[];
                Favorie: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    produitId: number | null;
                    userId: number | null;
                }[];
            } & {
                id: number;
                nom: string;
                description: string;
                img: string | null;
                tags: string | null;
                type: $Enums.ProduitType;
                status: $Enums.ProduitStatus;
                rejectionComment: string | null;
                categorieId: number;
                createdAt: Date;
                updatedAt: Date;
                isPublic: boolean | null;
            };
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            boutiqueId: number | null;
            particularId: number | null;
            produitId: number;
        }[];
    }>;
    getByShopId(req: Request, shopId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            imgs: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
            }[];
            tags: any;
            id: number;
            nom: string;
            description: string;
            categorieId: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Image: {
                id: number;
                img: string;
                createdAt: Date;
                updatedAt: Date;
                produitId: number;
            }[];
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
                tags: string;
                categorieId: number;
                categories: {
                    id: number;
                    nom: string;
                    description: string | null;
                };
                Image: {
                    id: number;
                    img: string;
                    createdAt: Date;
                    updatedAt: Date;
                    produitId: number;
                }[];
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
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            boutiqueId: number | null;
            particularId: number | null;
            produitId: number;
        }[];
    }>;
}
