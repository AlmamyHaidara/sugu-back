import { HttpStatus, Logger } from '@nestjs/common';
import { CreateParticulierDto } from './dto/create-particulier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateParticulierDto } from './dto/update-particulier.dto';
import { Prisma, ProduitStatus } from '@prisma/client';
import { SearchProduitsDto } from 'src/produit/dto/SearchProduits.dto';
export declare class ParticulierService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService, logger: Logger);
    create(createParticulierDto: CreateParticulierDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prixId: number;
            tags: any;
            prix: Prisma.Decimal;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            quantiter: number;
            produitId: number;
            boutiqueId: number | null;
            particularId: number | null;
            categories: {
                id: number;
                nom: string;
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
            type: import("@prisma/client").$Enums.ProduitType;
            status: import("@prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    updateProduct(updateData: UpdateParticulierDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    deleteProduct(userId: number, produitId: number): Promise<{
        message: string;
    }>;
    findAllProducts(userId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            published: boolean;
            prix: Prisma.Decimal;
            prixId: number;
            quantiter: number;
            particularId: number;
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
    findAllProduitsInValidation(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            published: boolean;
            prix: Prisma.Decimal;
            prixId: number;
            quantiter: number;
            particularId: number;
            particulier: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                userId: number;
            };
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: ({
                particular: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: number;
                };
                LigneCommand: ({
                    Commande: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date | null;
                        commandeNbr: string;
                        utilisateurId: number;
                        adresseId: number | null;
                        etat: import("@prisma/client").$Enums.EtatCommand;
                    };
                } & {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    quantiter: number;
                    prixId: number | null;
                    commandeId: number | null;
                })[];
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
    validateProduct(produitId: number, status: ProduitStatus, comment?: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    revalidateProduct(produitId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    findProductById(userId: number, productId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            published: boolean;
            prix: Prisma.Decimal;
            prixId: number;
            quantiter: number;
            particularId: number;
            particulier: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                userId: number;
            };
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: ({
                particular: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: number;
                };
                LigneCommand: ({
                    Commande: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date | null;
                        commandeNbr: string;
                        utilisateurId: number;
                        adresseId: number | null;
                        etat: import("@prisma/client").$Enums.EtatCommand;
                    };
                } & {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    quantiter: number;
                    prixId: number | null;
                    commandeId: number | null;
                })[];
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
    findAllApprovedProducts(query: SearchProduitsDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            categorie: string;
            prix: Prisma.Decimal;
            quantiter: number;
            particulier: {
                id: number;
                nom: string;
                prenom: string;
                phone: string;
                email: string;
            };
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: ({
                particular: {
                    utilisateur: {
                        id: number;
                        nom: string;
                        createdAt: Date;
                        updatedAt: Date;
                        prenom: string | null;
                        telephone: string;
                        email: string;
                        password: string;
                        profile: import("@prisma/client").$Enums.Profile;
                        avatar: string | null;
                    };
                } & {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: number;
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
}
