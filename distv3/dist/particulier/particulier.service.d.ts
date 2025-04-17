import { HttpStatus, Logger } from '@nestjs/common';
import { CreateParticulierDto } from './dto/create-particulier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateParticulierDto } from './dto/update-particulier.dto';
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
            prix: import("@prisma/client/runtime/library").Decimal;
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
                prix: import("@prisma/client/runtime/library").Decimal;
                id: number;
                quantiter: number;
            }[];
            nom: string;
            description: string;
            img: string;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    updateProduct(updateData: UpdateParticulierDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prixId: number;
            particular: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                userId: number;
            };
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            quantiter: number;
            particularId: number;
            categories: {
                id: number;
                nom: string;
                description: string | null;
            };
            Prix: {
                particular: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: number;
                };
                prix: import("@prisma/client/runtime/library").Decimal;
                id: number;
                quantiter: number;
                particularId: number;
            }[];
            nom: string;
            description: string;
            img: string;
            tags: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        };
    }>;
    deleteProduct(userId: number, produitId: number): Promise<{
        message: string;
    }>;
    findAllProducts(userId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            quantiter: number;
            boutiqueId: number;
            particularId: number;
            nom: string;
            description: string;
            img: string;
            tags: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
    findProductById(userId: number, productId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            prix: import("@prisma/client/runtime/library").Decimal;
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
                        etat: import(".prisma/client").$Enums.EtatCommand;
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
                prix: import("@prisma/client/runtime/library").Decimal;
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
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
}
