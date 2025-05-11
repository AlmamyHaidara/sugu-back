import { CreateCategorieProduitDto } from './dto/create-categorie-produit.dto';
import { UpdateCategorieProduitDto } from './dto/update-categorie-produit.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class CategorieProduitService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCategorieProduitDto: CreateCategorieProduitDto): string;
    findAll(): Promise<{
        id: number;
        nom: string;
        description: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nom: string;
        description: string | null;
    }>;
    update(id: number, updateCategorieProduitDto: UpdateCategorieProduitDto): string;
    remove(id: number): Promise<string>;
}
