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
            nom: string;
            email: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            img: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            phone: string | null;
            userId: number;
            countryId: number | null;
        };
    }>;
    findAllShopAndProducts(): Promise<{
        statusCode: number;
        boutiques: ({
            country: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date | null;
                isoCode: string | null;
            };
        } & {
            nom: string;
            email: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            img: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            phone: string | null;
            userId: number;
            countryId: number | null;
        })[];
        products: {
            categorie: string;
            prix: import("@prisma/client/runtime/library").Decimal;
            boutiqueId: number;
            categories: {
                nom: string;
            };
            Prix: {
                prix: import("@prisma/client/runtime/library").Decimal;
                boutiqueId: number;
            }[];
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
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
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string;
            tags: string | null;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        }[];
    }>;
    findAllShopByUser(userId: number): Promise<{
        statusCode: number;
        data: {
            nom: string;
            email: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            img: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            phone: string | null;
            userId: number;
            countryId: number | null;
        }[];
    }>;
    findAll(): Promise<{
        statusCode: number;
        data: ({
            country: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date | null;
                isoCode: string | null;
            };
            Prix: ({
                produits: {
                    nom: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    status: import(".prisma/client").$Enums.ProduitStatus;
                    description: string;
                    img: string;
                    tags: string | null;
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
            nom: string;
            email: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            img: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            phone: string | null;
            userId: number;
            countryId: number | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        statusCode: number;
        data: {
            nom: string;
            email: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            img: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            phone: string | null;
            userId: number;
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
            nom: string;
            email: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            img: string | null;
            categorie: import(".prisma/client").$Enums.CategorieBoutique;
            location: import(".prisma/client").$Enums.Location;
            phone: string | null;
            userId: number;
            countryId: number | null;
        };
    }>;
    updateProfile(id: number, updateBoutiqueDto: UpdateBoutiqueProfileDto): Promise<{
        statusCode: number;
        data: any;
    }>;
    remove(id: number): Promise<{
        statusCode: number;
        data: import(".prisma/client").Prisma.BatchPayload;
    }>;
    private getSalesStats;
    private getRevenueStats;
    private getOrderStats;
}
