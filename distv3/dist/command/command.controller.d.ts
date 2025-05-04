import { CommandService } from './command.service';
import { CreateCommandDto, EtatCommand } from './dto/create-command.dto';
export declare class CommandController {
    private readonly commandService;
    constructor(commandService: CommandService);
    create(createCammandDto: CreateCommandDto): Promise<{
        status: number;
        data: {
            ligneCommandInfo: any[];
            prixTotal: number;
            id: number;
            createdAt: Date;
            updatedAt: Date | null;
            commandeNbr: string;
            utilisateurId: number;
            etat: import("@prisma/client").$Enums.EtatCommand;
        };
    }>;
    createParticulier(createCammandDto: CreateCommandDto): Promise<{
        status: number;
        data: {
            ligneCommandInfo: any[];
            prixTotal: number;
            id: number;
            createdAt: Date;
            updatedAt: Date | null;
            commandeNbr: string;
            utilisateurId: number;
            etat: import("@prisma/client").$Enums.EtatCommand;
        };
    }>;
    findAll(userId: string): Promise<{
        LigneCommand: any[];
        total: any;
        id: number;
        createdAt: Date;
        commandeNbr: string;
        etat: import("@prisma/client").$Enums.EtatCommand;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        status: number;
        data: {};
    }>;
    findOneByShopId(id: string, shopId: string): Promise<{
        status: number;
        data: {};
    }>;
    findByShopId(shopId: string): Promise<{
        status: number;
        data: {
            utilisateur: {
                id: number;
                nom: string;
                prenom: string;
                telephone: string;
                email: string;
                Adresse: {
                    id: number;
                    nom: string;
                    telephone: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string;
                    userId: number;
                    quartier: string;
                    isdefault: boolean;
                }[];
            };
            LigneCommand: {
                products: {
                    prix: import("@prisma/client/runtime/library").Decimal;
                    quantiter: number;
                    prixId: number;
                    categories: {
                        id: number;
                        nom: string;
                        description: string | null;
                    };
                    id: number;
                    nom: string;
                    createdAt: Date;
                    updatedAt: Date;
                    status: import("@prisma/client").$Enums.ProduitStatus;
                    description: string;
                    img: string;
                    tags: string | null;
                    type: import("@prisma/client").$Enums.ProduitType;
                    rejectionComment: string | null;
                    categorieId: number;
                    isPublic: boolean | null;
                };
                Prix: {
                    produits: {
                        categories: {
                            id: number;
                            nom: string;
                            description: string | null;
                        };
                    } & {
                        id: number;
                        nom: string;
                        createdAt: Date;
                        updatedAt: Date;
                        status: import("@prisma/client").$Enums.ProduitStatus;
                        description: string;
                        img: string;
                        tags: string | null;
                        type: import("@prisma/client").$Enums.ProduitType;
                        rejectionComment: string | null;
                        categorieId: number;
                        isPublic: boolean | null;
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
                };
                id: number;
                createdAt: Date;
                updatedAt: Date;
                quantiter: number;
                prixId: number | null;
                commandeId: number | null;
            }[];
            id: number;
            createdAt: Date;
            utilisateurs: {
                id: number;
                nom: string;
                prenom: string;
                telephone: string;
                email: string;
                Adresse: {
                    id: number;
                    nom: string;
                    telephone: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string;
                    userId: number;
                    quartier: string;
                    isdefault: boolean;
                }[];
            };
            commandeNbr: string;
            etat: import("@prisma/client").$Enums.EtatCommand;
        }[];
    }>;
    updateCommandeEtat(id: string, updateCammandDto: {
        etat: EtatCommand;
    }): Promise<{
        status: number;
        message: string;
    }>;
}
