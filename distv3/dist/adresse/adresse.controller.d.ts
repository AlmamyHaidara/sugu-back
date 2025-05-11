import { AdresseService } from './adresse.service';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';
export declare class AdresseController {
    private readonly adresseService;
    constructor(adresseService: AdresseService);
    create(createAdresseDto: CreateAdresseDto): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            telephone: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
            isdefault: boolean;
        };
    }>;
    findAll(): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            telephone: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
            isdefault: boolean;
        }[];
    }>;
    findOne(id: string): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            telephone: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
            isdefault: boolean;
        }[];
    }>;
    findOneByUserId(userId: string): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            telephone: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
            isdefault: boolean;
        }[];
    }>;
    update(id: string, updateAdresseDto: UpdateAdresseDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: {
            id: number;
            nom: string;
            telephone: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
            isdefault: boolean;
        };
    }>;
    remove(id: string): Promise<{
        status: number;
        msg: string;
    }>;
}
