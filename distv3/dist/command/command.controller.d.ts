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
            adresseId: number | null;
            etat: import(".prisma/client").$Enums.EtatCommand;
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
            adresseId: number | null;
            etat: import(".prisma/client").$Enums.EtatCommand;
        };
    }>;
    findAll(userId: string): Promise<{
        LigneCommand: any[];
        total: any;
        id: number;
        createdAt: Date;
        commandeNbr: string;
        etat: import(".prisma/client").$Enums.EtatCommand;
    }[]>;
    findAllParticulier(userId: string): Promise<{
        LigneCommand: any[];
        total: any;
        id: number;
        createdAt: Date;
        commandeNbr: string;
        etat: import(".prisma/client").$Enums.EtatCommand;
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
                nom: string;
                prenom: string;
                email: string;
                telephone: string;
                id: number;
                Adresse: {
                    nom: string;
                    telephone: string;
                    id: number;
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
                Prix: {
                    produits: {
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
                nom: string;
                prenom: string;
                email: string;
                telephone: string;
                id: number;
                Adresse: {
                    nom: string;
                    telephone: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string;
                    userId: number;
                    quartier: string;
                    isdefault: boolean;
                }[];
            };
            commandeNbr: string;
            etat: import(".prisma/client").$Enums.EtatCommand;
        }[];
    }>;
    updateCommandeEtat(id: string, updateCammandDto: {
        etat: EtatCommand;
    }): Promise<{
        status: number;
        message: string;
    }>;
}
