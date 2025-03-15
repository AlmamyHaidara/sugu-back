import { Provider } from '@nestjs/common';
import * as winston from 'winston';
import { PrismaTransport } from 'src/prisma/prisma-transport';
import { PrismaService } from 'src/prisma/prisma.service';

export const LoggerProvider: Provider = {
  provide: 'WINSTON_LOGGER',
  useFactory: (prismaService: PrismaService) => {
    return winston.createLogger({
      level: 'info',
      transports: [
        new PrismaTransport({
          level: 'info',
          prismaService, // l'instance injectée de PrismaService
        }),
        new winston.transports.Console(),
      ],
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} [${level}]: ${message}`,
        ),
      ),
    });
  },
  inject: [PrismaService],
};
