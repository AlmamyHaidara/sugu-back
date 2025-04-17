import { ParticulierService } from './particulier.service';
import { CreateParticulierDto } from './dto/create-particulier.dto';
import { UpdateParticulierDto } from './dto/update-particulier.dto';
export declare class ParticulierController {
    private readonly particulierService;
    constructor(particulierService: ParticulierService);
    create(createParticulierDto: CreateParticulierDto, file: Express.Multer.File): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
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
    findAll(userId: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
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
    findOne(userId: string, produitId: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
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
    update(file: Express.Multer.File, updateParticulierDto: UpdateParticulierDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
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
    remove(userId: string, produitId: string): Promise<{
        message: string;
    }>;
}
