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
            etat: import(".prisma/client").$Enums.EtatCommand;
            utilisateurId: number;
            adresseId: number | null;
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
            etat: import(".prisma/client").$Enums.EtatCommand;
            utilisateurId: number;
            adresseId: number | null;
        };
    }>;
    findAll(userId: number): Promise<{
        LigneCommand: any[];
        total: any;
        id: number;
        createdAt: Date;
        commandeNbr: string;
        etat: import(".prisma/client").$Enums.EtatCommand;
    }[]>;
    findAllParticulier(userId: number): Promise<{
        LigneCommand: any[];
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
                    img: string;
                    description: string;
                    tags: string | null;
                    type: import(".prisma/client").$Enums.ProduitType;
                    status: import(".prisma/client").$Enums.ProduitStatus;
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
                        img: string;
                        description: string;
                        tags: string | null;
                        type: import(".prisma/client").$Enums.ProduitType;
                        status: import(".prisma/client").$Enums.ProduitStatus;
                        rejectionComment: string | null;
                        categorieId: number;
                        isPublic: boolean | null;
                    };
                } & {
                    prix: import("@prisma/client/runtime/library").Decimal;
                    id: number;
                    quantiter: number;
                    produitId: number;
                    boutiqueId: number | null;
                    particularId: number | null;
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
                    isdefault: boolean;
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
