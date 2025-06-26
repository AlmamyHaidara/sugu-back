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
            adresseId: number | null;
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
            adresseId: number | null;
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
    findAllParticulier(userId: number): Promise<{
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
                    nom: string;
                    createdAt: Date;
                    updatedAt: Date;
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
                        nom: string;
                        createdAt: Date;
                        updatedAt: Date;
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
            createdAt: Date;
            commandeNbr: string;
            etat: import("@prisma/client").$Enums.EtatCommand;
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
                    quartier: string;
                    description: string;
                    userId: number;
                    isdefault: boolean;
                }[];
            };
        }[];
    }>;
    updateCommandeEtat(commandeId: number, nouvelEtat: EtatCommand): Promise<{
        status: number;
        message: string;
    }>;
}
