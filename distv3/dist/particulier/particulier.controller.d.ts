import { ParticulierService } from './particulier.service';
import { CreateParticulierDto } from './dto/create-particulier.dto';
import { UpdateParticulierDto } from './dto/update-particulier.dto';
import { SearchProduitsDto } from 'src/produit/dto/SearchProduits.dto';
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
            type: import("@prisma/client").$Enums.ProduitType;
            status: import("@prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    }>;
    findAll(userId: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            published: boolean;
            prix: import("@prisma/client/runtime/library").Decimal;
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
    findAllApprovedProducts(query: SearchProduitsDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            categorie: string;
            prix: import("@prisma/client/runtime/library").Decimal;
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
    findOne(userId: string, produitId: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            published: boolean;
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
            type: import("@prisma/client").$Enums.ProduitType;
            status: import("@prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
    findAllProductInValidation(): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            published: boolean;
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
            type: import("@prisma/client").$Enums.ProduitType;
            status: import("@prisma/client").$Enums.ProduitStatus;
            rejectionComment: string | null;
            categorieId: number;
            createdAt: Date;
            updatedAt: Date;
            isPublic: boolean | null;
        }[];
    }>;
    validateProduct(produitId: string, status: string, comment?: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    update(file: Express.Multer.File, updateParticulierDto: UpdateParticulierDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    revalidateProduct(produitId: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    remove(userId: string, produitId: string): Promise<{
        message: string;
    }>;
}
