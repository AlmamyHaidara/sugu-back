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
            titre: string;
            description: string;
            img: string | null;
            pourcentage: number;
            dateFin: Date;
            dateDebut: Date;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
    }>;
    approved(createPublicityDto: CreatePublicityDto): string;
    validateProduct(adminId: number, produitId: number, isApproved: boolean, comment?: string): Promise<{
        description: string;
        img: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        nom: string;
        tags: string | null;
        type: import(".prisma/client").$Enums.ProduitType;
        status: import(".prisma/client").$Enums.ProduitStatus;
        rejectionComment: string | null;
        categorieId: number;
        isPublic: boolean | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findAllEnabke(): import(".prisma/client").Prisma.PrismaPromise<{
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findAllByDate(): import(".prisma/client").Prisma.PrismaPromise<{
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findOneByDate(date: Date): import(".prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updatePublicityDto: UpdatePublicityDto, file?: Express.Multer.File): Promise<{
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        titre: string;
        description: string;
        img: string | null;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
