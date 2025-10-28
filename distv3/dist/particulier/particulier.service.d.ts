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
            createdAt: Date;
            updatedAt: Date;
            id: number;
            quantiter: number;
            produitId: number;
            boutiqueId: number | null;
            particularId: number | null;
            categories: {
                nom: string;
                description: string | null;
                id: number;
            };
            Prix: {
                prix: Prisma.Decimal;
                id: number;
                quantiter: number;
            }[];
            Image: {
                img: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                produitId: number;
            }[];
            nom: string;
            description: string;
            img: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            isPublic: boolean | null;
            categorieId: number;
        };
    }>;
    updateProduct(updateData: UpdateParticulierDto, file?: Express.Multer.File[]): Promise<{
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
            Prix: {
                prix: Prisma.Decimal;
                id: number;
                quantiter: number;
                boutiqueId: number;
                particularId: number;
            }[];
            Image: {
                img: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                produitId: number;
            }[];
            nom: string;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
            id: number;
            categorieId: number;
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
                createdAt: Date;
                updatedAt: Date;
                id: number;
                userId: number;
            };
            categories: {
                nom: string;
                description: string | null;
                id: number;
            };
            Prix: ({
                particular: {
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    userId: number;
                };
                LigneCommand: ({
                    Commande: {
                        createdAt: Date;
                        updatedAt: Date | null;
                        id: number;
                        commandeNbr: string;
                        utilisateurId: number;
                        adresseId: number | null;
                        etat: import(".prisma/client").$Enums.EtatCommand;
                    };
                } & {
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    quantiter: number;
                    prixId: number | null;
                    commandeId: number | null;
                })[];
            } & {
                prix: Prisma.Decimal;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                quantiter: number;
                produitId: number;
                boutiqueId: number | null;
                particularId: number | null;
            })[];
            Image: {
                img: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                produitId: number;
            }[];
            nom: string;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
            id: number;
            categorieId: number;
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
                createdAt: Date;
                updatedAt: Date;
                id: number;
                userId: number;
            };
            categories: {
                nom: string;
                description: string | null;
                id: number;
            };
            Prix: ({
                particular: {
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    userId: number;
                };
                LigneCommand: ({
                    Commande: {
                        createdAt: Date;
                        updatedAt: Date | null;
                        id: number;
                        commandeNbr: string;
                        utilisateurId: number;
                        adresseId: number | null;
                        etat: import(".prisma/client").$Enums.EtatCommand;
                    };
                } & {
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    quantiter: number;
                    prixId: number | null;
                    commandeId: number | null;
                })[];
            } & {
                prix: Prisma.Decimal;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                quantiter: number;
                produitId: number;
                boutiqueId: number | null;
                particularId: number | null;
            })[];
            Image: {
                img: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                produitId: number;
            }[];
            nom: string;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
            id: number;
            categorieId: number;
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
                nom: string;
                description: string | null;
                id: number;
            };
            Prix: ({
                particular: {
                    utilisateur: {
                        nom: string;
                        createdAt: Date;
                        updatedAt: Date;
                        id: number;
                        telephone: string;
                        email: string;
                        prenom: string | null;
                        password: string;
                        profile: import(".prisma/client").$Enums.Profile;
                        avatar: string | null;
                    };
                } & {
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    userId: number;
                };
            } & {
                prix: Prisma.Decimal;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                quantiter: number;
                produitId: number;
                boutiqueId: number | null;
                particularId: number | null;
            })[];
            Image: {
                img: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                produitId: number;
            }[];
            nom: string;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            status: import(".prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
            id: number;
            categorieId: number;
        }[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
    }>;
}
