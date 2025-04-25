import { PublicityService } from './publicity.service';
import { CreatePublicityDto } from './dto/create-publicity.dto';
import { UpdatePublicityDto } from './dto/update-publicity.dto';
import { CreatePublicityApprovedProductDto } from './dto/create-publicity-approved-product.dto';
export declare class PublicityController {
    private readonly publicityService;
    constructor(publicityService: PublicityService);
    approved(createPublicityDto: CreatePublicityApprovedProductDto): Promise<{
        nom: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProduitStatus;
        description: string;
        img: string;
        tags: string | null;
        rejectionComment: string | null;
        categorieId: number;
        isPublic: boolean | null;
    }>;
    create(createPublicityDto: CreatePublicityDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
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
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        img: string | null;
        titre: string;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updatePublicityDto: UpdatePublicityDto): import(".prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        img: string | null;
        titre: string;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__OffreSpecialeClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        img: string | null;
        titre: string;
        pourcentage: number;
        dateFin: Date;
        dateDebut: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
