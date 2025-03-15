import { HttpStatus } from '@nestjs/common';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AdresseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
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
    findOneByUserId(id: number): Promise<{
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
    update(id: number, updateAdresseDto: UpdateAdresseDto): Promise<"This action adds a new adresse" | {
        status: HttpStatus;
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
    remove(id: number, userId: number): Promise<{
        status: number;
        msg: string;
    }>;
}
