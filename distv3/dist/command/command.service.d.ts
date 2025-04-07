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
            ligneCommandInfo: any[];
            prixTotal: number;
            id: number;
            commandeNbr: string;
            utilisateurId: number;
            etat: import(".prisma/client").$Enums.EtatCommand;
            createdAt: Date;
            updatedAt: Date | null;
        };
    }>;
    findAll(userId: number): Promise<{
        LigneCommand: any[];
        total: any;
        id: number;
        commandeNbr: string;
        etat: import(".prisma/client").$Enums.EtatCommand;
        createdAt: Date;
    }[]>;
    findOne(id: number, userId: number): Promise<{
        status: number;
        data: {};
    }>;
    findByShopId(shopId: number): Promise<{
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
            commandeNbr: string;
            etat: import(".prisma/client").$Enums.EtatCommand;
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
                    description: string;
                    userId: number;
                    quartier: string;
                }[];
            };
        }[];
    }>;
    updateCommandeEtat(commandeId: number, nouvelEtat: EtatCommand): Promise<{
        status: number;
        message: string;
    }>;
}
