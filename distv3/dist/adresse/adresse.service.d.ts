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
            nom: string;
            telephone: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
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
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
        }[];
    }>;
    findOne(id: number): Promise<{
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
        }[];
    }>;
    findOneByUserId(id: number): Promise<{
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
        }[];
    }>;
    update(id: number, updateAdresseDto: UpdateAdresseDto): Promise<{
        status: HttpStatus;
        data: {
            nom: string;
            telephone: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            userId: number;
            quartier: string;
        };
    }>;
    remove(id: number, userId: number): Promise<{
        status: number;
        msg: string;
    }>;
}
