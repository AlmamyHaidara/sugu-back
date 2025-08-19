import Transport, { TransportStreamOptions } from 'winston-transport';
import { PrismaService } from './prisma.service';
interface PrismaTransportOptions extends TransportStreamOptions {
    prismaService: PrismaService;
}
export declare class PrismaTransport extends Transport {
    private prismaService;
    constructor(opts: PrismaTransportOptions);
    log(info: any, callback: () => void): void;
}
export {};
