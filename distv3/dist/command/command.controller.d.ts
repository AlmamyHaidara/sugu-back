import { CommandService } from './command.service';
import { CreateCommandDto, EtatCommand } from './dto/create-command.dto';
export declare class CommandController {
    private readonly commandService;
    constructor(commandService: CommandService);
    create(createCammandDto: CreateCommandDto): Promise<{
        status: number;
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date | null;
            commandeNbr: string;
            utilisateurId: number;
            etat: import(".prisma/client").$Enums.EtatCommand;
        };
    }>;
    findAll(userId: string): Promise<{
        LigneCommand: {
            produits: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                nom: string;
                img: string;
                description: string;
                tags: string;
                categorieId: number;
            };
            boutiques: {
                id: number;
                nom: string;
                categorie: import(".prisma/client").$Enums.CategorieBoutique;
                location: import(".prisma/client").$Enums.Location;
                description: string;
                phone: string;
            };
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            quantiter: number;
            produitId: number;
            boutiqueId: number;
            createdAt: Date;
            updatedAt: Date;
            Prix: {
                produits: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    nom: string;
                    img: string;
                    description: string;
                    tags: string;
                    categorieId: number;
                };
                boutiques: {
                    id: number;
                    nom: string;
                    categorie: import(".prisma/client").$Enums.CategorieBoutique;
                    location: import(".prisma/client").$Enums.Location;
                    description: string;
                    phone: string;
                };
            } & {
                prix: import("@prisma/client/runtime/library").Decimal;
                id: number;
                quantiter: number;
                produitId: number;
                boutiqueId: number;
                createdAt: Date;
                updatedAt: Date;
            };
            prixId: number | null;
            commandeId: number | null;
        }[];
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
    findByShopId(shopId: string): Promise<{
        status: number;
        data: {
            utilisateur: {
                id: number;
                nom: string;
                email: string;
                telephone: string;
                prenom: string;
                Adresse: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    nom: string;
                    description: string;
                    userId: number;
                    telephone: string;
                    quartier: string;
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
                    img: string;
                    description: string;
                    tags: string;
                    categorieId: number;
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
                        img: string;
                        description: string;
                        tags: string;
                        categorieId: number;
                    };
                } & {
                    prix: import("@prisma/client/runtime/library").Decimal;
                    id: number;
                    quantiter: number;
                    produitId: number;
                    boutiqueId: number;
                    createdAt: Date;
                    updatedAt: Date;
                };
                id: number;
                quantiter: number;
                createdAt: Date;
                updatedAt: Date;
                prixId: number | null;
                commandeId: number | null;
            }[];
            id: number;
            createdAt: Date;
            utilisateurs: {
                id: number;
                nom: string;
                email: string;
                telephone: string;
                prenom: string;
                Adresse: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    nom: string;
                    description: string;
                    userId: number;
                    telephone: string;
                    quartier: string;
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
