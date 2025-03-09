import { AdresseService } from './adresse.service';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';
export declare class AdresseController {
    private readonly adresseService;
    constructor(adresseService: AdresseService);
    create(createAdresseDto: CreateAdresseDto): Promise<{
        status: number;
        data: {
            nom: string;
            telephone: string;
            id: number;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            quartier: string;
        };
    }>;
    findAll(): Promise<{
        status: number;
        data: {
            nom: string;
            telephone: string;
            id: number;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            quartier: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        status: number;
        data: {
            nom: string;
            telephone: string;
            id: number;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            quartier: string;
        }[];
    }>;
    findOneByUserId(userId: string): Promise<{
        status: number;
        data: {
            nom: string;
            telephone: string;
            id: number;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            quartier: string;
        }[];
    }>;
    update(id: string, updateAdresseDto: UpdateAdresseDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: {
            nom: string;
            telephone: string;
            id: number;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            quartier: string;
        };
    }>;
    remove(id: string, userId: string): Promise<{
        status: number;
        msg: string;
    }>;
}
