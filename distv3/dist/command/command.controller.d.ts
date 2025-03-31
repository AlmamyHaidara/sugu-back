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
                nom: string;
                createdAt: Date;
                updatedAt: Date;
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
            createdAt: Date;
            updatedAt: Date;
            quantiter: number;
            produitId: number;
            boutiqueId: number;
            Prix: {
                produits: {
                    id: number;
                    nom: string;
                    createdAt: Date;
                    updatedAt: Date;
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
                createdAt: Date;
                updatedAt: Date;
                quantiter: number;
                produitId: number;
                boutiqueId: number;
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
                        nom: string;
                        createdAt: Date;
                        updatedAt: Date;
                        img: string;
                        description: string;
                        tags: string;
                        categorieId: number;
                    };
                } & {
                    prix: import("@prisma/client/runtime/library").Decimal;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    quantiter: number;
                    produitId: number;
                    boutiqueId: number;
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
            commandeNbr: string;
            etat: import(".prisma/client").$Enums.EtatCommand;
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
