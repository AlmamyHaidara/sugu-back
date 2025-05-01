import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'warn', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
    });

    // this.$on('query', (event: Prisma.QueryEvent) => {
    //   this.logger.debug(`Query: ${event.query}`);
    //   this.logger.debug(`Params: ${event.params}`);
    //   this.logger.debug(`Duration: ${event.duration}ms`);
    // });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database connection closed.');
  }
}
