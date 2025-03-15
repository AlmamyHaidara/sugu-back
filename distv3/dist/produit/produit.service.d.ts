import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProduitService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProduitDto: CreateProduitDto): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            img: string;
            tags: string;
            categorieId: number;
        };
    }>;
    findAll(): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            img: string;
            tags: string;
            categorieId: number;
        }[];
    }>;
    findOne(id: number): Promise<{
        status: number;
        data: {};
    }>;
    update(id: number, updateProduitDto: UpdateProduitDto): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            img: string;
            tags: string;
            categorieId: number;
        };
    }>;
    remove(id: number): Promise<{
        status: number;
        msg: string;
    }>;
}
