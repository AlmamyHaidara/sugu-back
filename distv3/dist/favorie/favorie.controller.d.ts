import { FavorieService } from './favorie.service';
import { CreateFavorieDto } from './dto/create-favorie.dto';
import { UpdateFavorieDto } from './dto/update-favorie.dto';
export declare class FavorieController {
    private readonly favorieService;
    constructor(favorieService: FavorieService);
    create(req: Request, createFavorieDto: CreateFavorieDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        produitId: number | null;
        userId: number | null;
    }>;
    findAll(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
        product: {
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            Prix: {
                prix: import("@prisma/client/runtime/library").Decimal;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                quantiter: number;
                produitId: number;
                boutiqueId: number | null;
                particularId: number | null;
            }[];
        } & {
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        produitId: number | null;
        userId: number | null;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__FavorieClient<{
        product: {
            categories: {
                nom: string;
                id: number;
                description: string | null;
            };
            Prix: {
                prix: import("@prisma/client/runtime/library").Decimal;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                quantiter: number;
                produitId: number;
                boutiqueId: number | null;
                particularId: number | null;
            }[];
        } & {
            nom: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProduitStatus;
            description: string;
            img: string | null;
            tags: string | null;
            type: import(".prisma/client").$Enums.ProduitType;
            rejectionComment: string | null;
            categorieId: number;
            isPublic: boolean | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        produitId: number | null;
        userId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateFavorieDto: UpdateFavorieDto): string;
    remove(id: string): string;
}
