import { PrixService } from './prix.service';
import { CreatePrixDto } from './dto/create-prix.dto';
import { UpdatePrixDto } from './dto/update-prix.dto';
export declare class PrixController {
    private readonly prixService;
    constructor(prixService: PrixService);
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
    findOne(id: string, produitId: string, boutiqueId: string): Promise<{
        status: number;
        data: {};
    }>;
    update(id: string, updatePrixDto: UpdatePrixDto): Promise<{
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
    remove(id: string): Promise<{
        status: number;
        msg: string;
    }>;
}
