import { CategorieProduitService } from './categorie-produit.service';
import { CreateCategorieProduitDto } from './dto/create-categorie-produit.dto';
import { UpdateCategorieProduitDto } from './dto/update-categorie-produit.dto';
export declare class CategorieProduitController {
    private readonly categorieProduitService;
    constructor(categorieProduitService: CategorieProduitService);
    create(createCategorieProduitDto: CreateCategorieProduitDto): string;
    findAll(): Promise<{
        nom: string;
        id: number;
        description: string | null;
    }[]>;
    findOne(id: string): Promise<{
        nom: string;
        id: number;
        description: string | null;
    }>;
    update(id: string, updateCategorieProduitDto: UpdateCategorieProduitDto): string;
    remove(id: string): Promise<string>;
}
