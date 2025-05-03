import { HttpStatus, Logger } from '@nestjs/common';
import { CreatePublicityDto } from './dto/create-publicity.dto';
import { UpdatePublicityDto } from './dto/update-publicity.dto';
import { PrismaService } from 'src/prisma/prisma.service copy';
export declare class PublicityService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService, logger: Logger);
    create(createPublicityDto: CreatePublicityDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            img: string | null;
            titre: string;
            pourcentage: number;
            dateFin: Date;
            dateDebut: Date;
        };
    }>;
    approved(createPublicityDto: CreatePublicityDto): string;
    validateProduct(adminId: number, produitId: number, isApproved: boolean, comment?: string): Promise<{
        nom: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ProduitStatus;
        description: string;
        img: string;
        tags: string | null;
        type: import("@prisma/client").$Enums.ProduitType;
        rejectionComment: string | null;
        categorieId: number;
        isPublic: boolean | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        img: string | null;
        titre: string;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
    }[]>;
    findAllByDate(date: Date): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        img: string | null;
        titre: string;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        img: string | null;
        titre: string;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findOneByDate(date: Date): import("@prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        img: string | null;
        titre: string;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updatePublicityDto: UpdatePublicityDto): import("@prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        img: string | null;
        titre: string;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        img: string | null;
        titre: string;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
