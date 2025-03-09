import { CreateCommandDto, EtatCommand } from './dto/create-command.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PrixService } from 'src/prix/prix.service';
import { NotificationsService } from 'src/notifications/notifications.service';
export declare class CommandService {
    private readonly prisma;
    private readonly user;
    private readonly prix;
    private readonly notification;
    constructor(prisma: PrismaService, user: UsersService, prix: PrixService, notification: NotificationsService);
    create(createCommandDto: CreateCommandDto): Promise<{
        status: number;
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date | null;
            utilisateurId: number;
            commandeNbr: string;
            etat: import(".prisma/client").$Enums.EtatCommand;
        };
    }>;
    findAll(userId: number): Promise<{
        LigneCommand: {
            produits: {
                nom: string;
                id: number;
                description: string;
                img: string;
                tags: string[];
                categorieId: number;
                createdAt: Date;
                updatedAt: Date;
            };
            boutiques: {
                nom: string;
                id: number;
                description: string;
                categorie: import(".prisma/client").$Enums.CategorieBoutique;
                location: import(".prisma/client").$Enums.Location;
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
                    nom: string;
                    id: number;
                    description: string;
                    img: string;
                    tags: string[];
                    categorieId: number;
                    createdAt: Date;
                    updatedAt: Date;
                };
                boutiques: {
                    nom: string;
                    id: number;
                    description: string;
                    categorie: import(".prisma/client").$Enums.CategorieBoutique;
                    location: import(".prisma/client").$Enums.Location;
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
    findOne(id: number, userId: number): Promise<{
        status: number;
        data: {};
    }>;
    findByShopId(shopId: number): Promise<{
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
                    description: string;
                    createdAt: Date;
                    updatedAt: Date;
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
                        nom: string;
                        id: number;
                        description: string | null;
                    };
                    nom: string;
                    id: number;
                    description: string;
                    img: string;
                    tags: string[];
                    categorieId: number;
                    createdAt: Date;
                    updatedAt: Date;
                };
                Prix: {
                    produits: {
                        categories: {
                            nom: string;
                            id: number;
                            description: string | null;
                        };
                    } & {
                        nom: string;
                        id: number;
                        description: string;
                        img: string;
                        tags: string[];
                        categorieId: number;
                        createdAt: Date;
                        updatedAt: Date;
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
                nom: string;
                prenom: string;
                email: string;
                telephone: string;
                id: number;
                Adresse: {
                    nom: string;
                    telephone: string;
                    id: number;
                    description: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: number;
                    quartier: string;
                }[];
            };
            commandeNbr: string;
            etat: import(".prisma/client").$Enums.EtatCommand;
        }[];
    }>;
    updateCommandeEtat(commandeId: number, nouvelEtat: EtatCommand): Promise<{
        status: number;
        message: string;
    }>;
}
