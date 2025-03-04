import { CreatePrixDto } from './dto/create-prix.dto';
import { UpdatePrixDto } from './dto/update-prix.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PrixService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPrixDto: CreatePrixDto): Promise<{
        status: number;
        data: {
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            quantiter: number;
            boutiqueId: number;
            produitId: number;
        };
    }>;
    findAll(): Promise<{
        status: number;
        data: {
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            quantiter: number;
            boutiqueId: number;
            produitId: number;
        }[];
    }>;
    findOne(id: number, productId: number, boutiqueId: number): Promise<{
        status: number;
        data: {};
    }>;
    update(id: number, updatePrixDto: UpdatePrixDto): Promise<{
        status: number;
        data: {
            prix: import("@prisma/client/runtime/library").Decimal;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            quantiter: number;
            boutiqueId: number;
            produitId: number;
        };
    }>;
    findOneManyById(ids: number[]): Promise<{
        id: number;
    }[] | null>;
    findOneById(id: number): Promise<{
        id: number;
    } | null>;
    remove(id: number): Promise<{
        status: number;
        msg: string;
    }>;
}
