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
            createdAt: Date;
            updatedAt: Date | null;
            commandeNbr: string;
            utilisateurId: number;
            etat: import("@prisma/client").$Enums.EtatCommand;
        };
    }>;
    createParticulier(createCommandDto: CreateCommandDto): Promise<{
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
    findAll(userId: number): Promise<{
        LigneCommand: any[];
        total: any;
        id: number;
        createdAt: Date;
        commandeNbr: string;
        etat: import("@prisma/client").$Enums.EtatCommand;
    }[]>;
    findOne(id: number, userId: number): Promise<{
        status: number;
        data: {};
    }>;
    findOneByShopId(id: number, shopId: number): Promise<{
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
                            nom: string;
                            id: number;
                            description: string | null;
                        };
                    } & {
                        nom: string;
                        id: number;
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
            etat: import("@prisma/client").$Enums.EtatCommand;
        }[];
    }>;
    updateCommandeEtat(commandeId: number, nouvelEtat: EtatCommand): Promise<{
        status: number;
        message: string;
    }>;
}
