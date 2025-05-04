import { PublicityService } from './publicity.service';
import { CreatePublicityDto } from './dto/create-publicity.dto';
import { UpdatePublicityDto } from './dto/update-publicity.dto';
import { CreatePublicityApprovedProductDto } from './dto/create-publicity-approved-product.dto';
export declare class PublicityController {
    private readonly publicityService;
    constructor(publicityService: PublicityService);
    approved(createPublicityDto: CreatePublicityApprovedProductDto): Promise<{
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
    create(createPublicityDto: CreatePublicityDto, file: Express.Multer.File): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__OffreSpecialeClient<{
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
    update(id: string, updatePublicityDto: UpdatePublicityDto, file: Express.Multer.File): Promise<{
        statusCode: number;
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
        message: string;
    }>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__OffreSpecialeClient<{
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
