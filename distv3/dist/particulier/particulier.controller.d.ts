import { ParticulierService } from './particulier.service';
import { CreateParticulierDto } from './dto/create-particulier.dto';
import { UpdateParticulierDto } from './dto/update-particulier.dto';
import { SearchProduitsDto } from 'src/produit/dto/SearchProduits.dto';
export declare class ParticulierController {
    private readonly particulierService;
    constructor(particulierService: ParticulierService);
    create(files: Array<Express.Multer.File>, createParticulierDto: CreateParticulierDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            prixId: number;
            tags: any;
            prix: import("@prisma/client/runtime/library").Decimal;
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
                prix: import("@prisma/client/runtime/library").Decimal;
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
    findAll(userId: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            published: boolean;
            prix: import("@prisma/client/runtime/library").Decimal;
            prixId: number;
            quantiter: number;
            particularId: number;
            Prix: {
                prix: import("@prisma/client/runtime/library").Decimal;
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
    findAllApprovedProducts(query: SearchProduitsDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            categorie: string;
            prix: import("@prisma/client/runtime/library").Decimal;
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
                prix: import("@prisma/client/runtime/library").Decimal;
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
                prix: import("@prisma/client/runtime/library").Decimal;
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
                prix: import("@prisma/client/runtime/library").Decimal;
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
    validateProduct(produitId: string, status: string, comment?: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    update(files: Array<Express.Multer.File>, updateParticulierDto: UpdateParticulierDto): Promise<{
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
