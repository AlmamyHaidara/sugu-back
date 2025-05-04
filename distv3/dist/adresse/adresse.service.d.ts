import { HttpStatus } from '@nestjs/common';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AdresseService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createAdresseDto: CreateAdresseDto): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            quartier: string;
            telephone: string;
            description: string;
            userId: number;
            isdefault: boolean;
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
            isdefault: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            quartier: string;
            telephone: string;
            description: string;
            userId: number;
            isdefault: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOneByUserId(id: number): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            quartier: string;
            telephone: string;
            description: string;
            userId: number;
            isdefault: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    update(id: number, updateAdresseDto: UpdateAdresseDto): Promise<{
        status: HttpStatus;
        data: {
            id: number;
            nom: string;
            quartier: string;
            telephone: string;
            description: string;
            userId: number;
            isdefault: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(id: number): Promise<{
        status: number;
        msg: string;
    }>;
}
