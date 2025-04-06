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
            commandeNbr: string;
            utilisateurId: number;
            etat: import(".prisma/client").$Enums.EtatCommand;
        };
    }>;
    findAll(userId: number): Promise<{
        LigneCommand: {
            produits: {
                nom: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                img: string;
                tags: string;
                categorieId: number;
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
            createdAt: Date;
            updatedAt: Date;
            quantiter: number;
            produitId: number;
            boutiqueId: number;
            Prix: {
                produits: {
                    nom: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string;
                    img: string;
                    tags: string;
                    categorieId: number;
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
                        nom: string;
                        id: number;
                        description: string | null;
                    };
                    nom: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string;
                    img: string;
                    tags: string;
                    categorieId: number;
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
                        createdAt: Date;
                        updatedAt: Date;
                        description: string;
                        img: string;
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
