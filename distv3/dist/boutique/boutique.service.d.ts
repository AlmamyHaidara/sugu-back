import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BoutiqueService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createBoutiqueDto: CreateBoutiqueDto): Promise<{
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
    findAllShopWithProducts(shopId: number): Promise<{
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
    findOne(id: number): Promise<{
        status: number;
        data: {};
    }>;
    update(id: number, updateBoutiqueDto: UpdateBoutiqueDto): Promise<{
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
    remove(id: number): Promise<{
        status: number;
        msg: string;
    }>;
}
