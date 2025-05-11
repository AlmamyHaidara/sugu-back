import { CategorieProduitService } from './categorie-produit.service';
import { CreateCategorieProduitDto } from './dto/create-categorie-produit.dto';
import { UpdateCategorieProduitDto } from './dto/update-categorie-produit.dto';
export declare class CategorieProduitController {
    private readonly categorieProduitService;
    constructor(categorieProduitService: CategorieProduitService);
    create(createCategorieProduitDto: CreateCategorieProduitDto): string;
    findAll(): Promise<{
        id: number;
        nom: string;
        description: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        nom: string;
        description: string | null;
    }>;
    update(id: string, updateCategorieProduitDto: UpdateCategorieProduitDto): string;
    remove(id: string): Promise<string>;
}
