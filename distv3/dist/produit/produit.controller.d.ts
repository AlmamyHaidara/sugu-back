import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
export declare class ProduitController {
    private readonly produitService;
    constructor(produitService: ProduitService);
    create(file: Express.Multer.File, createProduitDto: CreateProduitDto): Promise<{
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
    findOne(id: string): Promise<{
        status: number;
        data: {};
    }>;
    update(id: string, updateProduitDto: UpdateProduitDto): Promise<{
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
    remove(id: string): Promise<{
        status: number;
        msg: string;
    }>;
}
