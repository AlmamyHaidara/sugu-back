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
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
            isDefault: boolean;
        };
    }>;
    findAll(): Promise<{
        status: number;
        data: {
            nom: string;
            telephone: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
            isDefault: boolean;
        }[];
    }>;
    findOne(id: string): Promise<{
        status: number;
        data: {
            nom: string;
            telephone: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
            isDefault: boolean;
        }[];
    }>;
    findOneByUserId(userId: string): Promise<{
        status: number;
        data: {
            nom: string;
            telephone: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
            isDefault: boolean;
        }[];
    }>;
    update(id: string, updateAdresseDto: UpdateAdresseDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: {
            nom: string;
            telephone: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
            isDefault: boolean;
        };
    }>;
    updateToDefault(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: {
            nom: string;
            telephone: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
            isDefault: boolean;
        };
    }>;
    remove(id: string, userId: string): Promise<{
        status: number;
        msg: string;
    }>;
}
