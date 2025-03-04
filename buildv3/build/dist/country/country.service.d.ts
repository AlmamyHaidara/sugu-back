import { PrismaService } from 'src/prisma/prisma.service';
export declare class CountryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll: () => Promise<{
        id: number;
        name: string;
        isoCode: string;
    }[]>;
}
