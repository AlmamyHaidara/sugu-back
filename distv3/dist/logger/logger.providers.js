"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerProvider = void 0;
const winston = require("winston");
const prisma_transport_1 = require("../prisma/prisma-transport");
const prisma_service_1 = require("../prisma/prisma.service");
exports.LoggerProvider = {
    provide: 'WINSTON_LOGGER',
    useFactory: (prismaService) => {
        return winston.createLogger({
            level: 'info',
            transports: [
                new prisma_transport_1.PrismaTransport({
                    level: 'info',
                    prismaService,
                }),
                new winston.transports.Console(),
            ],
            format: winston.format.combine(winston.format.timestamp(), winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)),
        });
    },
    inject: [prisma_service_1.PrismaService],
};
//# sourceMappingURL=logger.providers.js.map