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
            utilisateurId: number;
            commandeNbr: string;
            etat: import(".prisma/client").$Enums.EtatCommand;
        };
    }>;
    findAll(userId: string): Promise<{
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
    findOne(id: string, userId: string): Promise<{
        status: number;
        data: {};
    }>;
    updateCommandeEtat(id: string, updateCammandDto: {
        etat: EtatCommand;
    }): Promise<{
        status: number;
        message: string;
    }>;
}
