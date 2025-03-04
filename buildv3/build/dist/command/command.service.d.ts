import { CreateCommandDto, EtatCommand } from './dto/create-command.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PrixService } from 'src/prix/prix.service';
export declare class CommandService {
    private readonly prisma;
    private readonly user;
    private readonly prix;
    constructor(prisma: PrismaService, user: UsersService, prix: PrixService);
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
        LigneCommand: ({
            Prix: {
                produits: {
                    nom: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string;
                    tags: string[];
                    img: string;
                    categorieId: number;
                };
                boutiques: {
                    nom: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    categorie: import(".prisma/client").$Enums.CategorieBoutique;
                    description: string;
                    img: string | null;
                    countryId: number | null;
                    location: import(".prisma/client").$Enums.Location;
                    phone: string | null;
                    userId: number;
                };
            } & {
                prix: import("@prisma/client/runtime/library").Decimal;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                quantiter: number;
                boutiqueId: number;
                produitId: number;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            quantiter: number;
            prixId: number | null;
            commandeId: number | null;
        })[];
    }[]>;
    findOne(id: number, userId: number): Promise<{
        status: number;
        data: {};
    }>;
    updateCommandeEtat(commandeId: number, nouvelEtat: EtatCommand): Promise<{
        status: number;
        message: string;
    }>;
}
