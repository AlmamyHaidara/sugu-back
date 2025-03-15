import { AdresseService } from './adresse.service';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';
export declare class AdresseController {
    private readonly adresseService;
    constructor(adresseService: AdresseService);
    create(createAdresseDto: CreateAdresseDto): Promise<"This action adds a new adresse" | {
        status: number;
        data: {
            id: number;
            nom: string;
            quartier: string;
            telephone: string;
            description: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            quartier: string;
            telephone: string;
            description: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            quartier: string;
            telephone: string;
            description: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOneByUserId(userId: string): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            quartier: string;
            telephone: string;
            description: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    update(id: string, updateAdresseDto: UpdateAdresseDto): Promise<"This action adds a new adresse" | {
        status: import("@nestjs/common").HttpStatus;
        data: {
            id: number;
            nom: string;
            quartier: string;
            telephone: string;
            description: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(id: string, userId: string): Promise<{
        status: number;
        msg: string;
    }>;
}
