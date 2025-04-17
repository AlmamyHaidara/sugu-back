import { Logger } from '@nestjs/common';
import { CreatePublicityDto } from './dto/create-publicity.dto';
import { UpdatePublicityDto } from './dto/update-publicity.dto';
import { PrismaService } from 'src/prisma/prisma.service copy';
export declare class PublicityService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService, logger: Logger);
    create(createPublicityDto: CreatePublicityDto): string;
    validateProduct(adminId: number, produitId: number, isApproved: boolean, comment?: string): Promise<{
        isPublic: boolean | null;
        nom: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        img: string;
        tags: string | null;
        categorieId: number;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePublicityDto: UpdatePublicityDto): string;
    remove(id: number): string;
}
