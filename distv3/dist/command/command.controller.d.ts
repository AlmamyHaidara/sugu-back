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
            commandeNbr: string;
            utilisateurId: number;
            adresseId: number | null;
            etat: import("@prisma/client").$Enums.EtatCommand;
            createdAt: Date;
            updatedAt: Date | null;
        };
    }>;
    createParticulier(createCammandDto: CreateCommandDto): Promise<{
        status: number;
        data: {
            ligneCommandInfo: any[];
            prixTotal: number;
            id: number;
            commandeNbr: string;
            utilisateurId: number;
            adresseId: number | null;
            etat: import("@prisma/client").$Enums.EtatCommand;
            createdAt: Date;
            updatedAt: Date | null;
        };
    }>;
    findAll(userId: string): Promise<{
        LigneCommand: any[];
        total: any;
        id: number;
        commandeNbr: string;
        etat: import("@prisma/client").$Enums.EtatCommand;
        createdAt: Date;
    }[]>;
    findAllParticulier(userId: string): Promise<{
        LigneCommand: any[];
        total: any;
        id: number;
        commandeNbr: string;
        etat: import("@prisma/client").$Enums.EtatCommand;
        createdAt: Date;
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
                telephone: string;
                email: string;
                nom: string;
                prenom: string;
                Adresse: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    telephone: string;
                    nom: string;
                    quartier: string;
                    description: string;
                    userId: number;
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
                    createdAt: Date;
                    updatedAt: Date;
                    nom: string;
                    description: string;
                    img: string;
                    tags: string | null;
                    type: import("@prisma/client").$Enums.ProduitType;
                    status: import("@prisma/client").$Enums.ProduitStatus;
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
                        createdAt: Date;
                        updatedAt: Date;
                        nom: string;
                        description: string;
                        img: string;
                        tags: string | null;
                        type: import("@prisma/client").$Enums.ProduitType;
                        status: import("@prisma/client").$Enums.ProduitStatus;
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
            commandeNbr: string;
            etat: import("@prisma/client").$Enums.EtatCommand;
            createdAt: Date;
            utilisateurs: {
                id: number;
                telephone: string;
                email: string;
                nom: string;
                prenom: string;
                Adresse: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    telephone: string;
                    nom: string;
                    quartier: string;
                    description: string;
                    userId: number;
                    isdefault: boolean;
                }[];
            };
        }[];
    }>;
    updateCommandeEtat(id: string, updateCammandDto: {
        etat: EtatCommand;
    }): Promise<{
        status: number;
        message: string;
    }>;
}
