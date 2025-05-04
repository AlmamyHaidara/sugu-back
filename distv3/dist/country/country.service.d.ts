import { PrismaService } from 'src/prisma/prisma.service';
export declare class CountryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll: () => Promise<{
        name: string;
        id: number;
        isoCode: string;
    }[]>;
}
