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
            titre: string;
            description: string;
            img: string | null;
            pourcentage: number;
            dateFin: Date;
            dateDebut: Date;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    approved(createPublicityDto: CreatePublicityDto): string;
    validateProduct(adminId: number, produitId: number, isApproved: boolean, comment?: string): Promise<{
        id: number;
        description: string;
        img: string;
        createdAt: Date;
        updatedAt: Date;
        nom: string;
        tags: string | null;
        type: import("@prisma/client").$Enums.ProduitType;
        status: import("@prisma/client").$Enums.ProduitStatus;
        rejectionComment: string | null;
        categorieId: number;
        isPublic: boolean | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAllEnabke(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAllByDate(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        id: number;
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findOneByDate(date: Date): import("@prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        id: number;
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updatePublicityDto: UpdatePublicityDto, file?: Express.Multer.File): Promise<{
        id: number;
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        id: number;
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
