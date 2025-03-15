import { BoutiqueService } from './boutique.service';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
export declare class BoutiqueController {
    private readonly boutiqueService;
    constructor(boutiqueService: BoutiqueService);
    create(file: Express.Multer.File, createBoutiqueDto: CreateBoutiqueDto): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            description: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        };
    }>;
    findAll(): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            description: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        }[];
    }>;
    findOne(id: string): Promise<{
        status: number;
        data: {};
    }>;
    findBoutiqueProduit(id: string): Promise<{
        Prix: ({
            produits: {
                id: number;
                nom: string;
                description: string;
                createdAt: Date;
                updatedAt: Date;
                img: string;
                tags: string;
                categorieId: number;
            };
        } & {
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            produitId: number;
            boutiqueId: number;
            quantiter: number;
        })[];
    } & {
        id: number;
        nom: string;
        description: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        categorie: import(".prisma/client").$Enums.CategorieBoutique;
        location: import(".prisma/client").$Enums.Location;
        img: string | null;
        phone: string | null;
        countryId: number | null;
    }>;
    update(id: string, updateBoutiqueDto: UpdateBoutiqueDto): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            description: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        };
    }>;
    remove(id: string): Promise<{
        status: number;
        msg: string;
    }>;
}
