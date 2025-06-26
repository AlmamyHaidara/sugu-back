import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { UpdateBoutiqueProfileDto } from './dto/update-boutique-profile.dto';
import { PrixService } from 'src/prix/prix.service';
export declare class BoutiqueService {
    private readonly prisma;
    private readonly mailService;
    private readonly usersService;
    private readonly prixService;
    private readonly logger;
    constructor(prisma: PrismaService, mailService: MailService, usersService: UsersService, prixService: PrixService);
    create(createBoutiqueDto: CreateBoutiqueDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            id: number;
            nom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            categorie: import("@prisma/client").$Enums.CategorieBoutique;
            location: import("@prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        };
    }>;
    findAllShopAndProducts(): Promise<{
        statusCode: number;
        boutiques: ({
            country: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                isoCode: string | null;
            };
        } & {
            id: number;
            nom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            categorie: import("@prisma/client").$Enums.CategorieBoutique;
            location: import("@prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        })[];
        products: {
            categorie: string;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
            boutiqueId: number;
            Prix: {
                prix: import("@prisma/client/runtime/library").Decimal;
                quantiter: number;
                boutiqueId: number;
            }[];
            categories: {
                nom: string;
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
        }[];
    }>;
    findAllShopWithProducts(shopId: number): Promise<{
        statusCode: number;
        data: {
            categorie: string;
            produitId: number;
            boutiqueId: number;
            prix: import("@prisma/client/runtime/library").Decimal;
            quantiter: number;
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
        }[];
    }>;
    findAllShopByUser(userId: number): Promise<{
        statusCode: number;
        data: {
            id: number;
            nom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            categorie: import("@prisma/client").$Enums.CategorieBoutique;
            location: import("@prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        }[];
    }>;
    findAll(): Promise<{
        statusCode: number;
        data: ({
            country: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                isoCode: string | null;
            };
            Prix: ({
                produits: {
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
            })[];
        } & {
            id: number;
            nom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            categorie: import("@prisma/client").$Enums.CategorieBoutique;
            location: import("@prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        statusCode: number;
        data: {
            id: number;
            nom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            categorie: import("@prisma/client").$Enums.CategorieBoutique;
            location: import("@prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        };
    }>;
    getStatistic(id: number): Promise<{
        statusCode: number;
        data: {
            sales: {
                total: any;
                daily: number[];
            };
            orders: {
                pending: number;
                shipped: number;
                delivered: number;
                cancelled: number;
            };
            revenue: {
                total: any;
                monthly: any[];
            };
        };
    }>;
    update(id: number, updateBoutiqueDto: UpdateBoutiqueDto): Promise<{
        statusCode: number;
        data: {
            id: number;
            nom: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            categorie: import("@prisma/client").$Enums.CategorieBoutique;
            location: import("@prisma/client").$Enums.Location;
            img: string | null;
            phone: string | null;
            countryId: number | null;
        };
    }>;
    updateProfile(id: number, updateBoutiqueDto: UpdateBoutiqueProfileDto): Promise<{
        statusCode: number;
        data: any;
    }>;
    remove(id: number): Promise<{
        statusCode: number;
        data: import("@prisma/client").Prisma.BatchPayload;
    }>;
    private getSalesStats;
    private getRevenueStats;
    private getOrderStats;
}
