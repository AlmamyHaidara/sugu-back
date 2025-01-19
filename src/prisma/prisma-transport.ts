// prisma-transport.ts
import Transport, { TransportStreamOptions } from 'winston-transport';
import { PrismaService } from './prisma.service';

interface PrismaTransportOptions extends TransportStreamOptions {
  prismaService: PrismaService;
}

export class PrismaTransport extends Transport {
  private prismaService: PrismaService;

  constructor(opts: PrismaTransportOptions) {
    super(opts);
    this.prismaService = opts.prismaService;
  }

  log(info: any, callback: () => void): void {
    // Winston peut utiliser "setImmediate" pour s'assurer que le log est traité de manière asynchrone.
    setImmediate(() => this.emit('logged', info));

    // Extraire les informations de log
    const { level, message, timestamp = new Date().toISOString() } = info;

    // Insérer le log dans la table via Prisma
    this.prismaService.logs
      .create({
        data: {
          level,
          message,
          timestamp: new Date(timestamp).toDateString(),
        },
      })
      .catch((err) =>
        console.error("Erreur lors de l'insertion du log en BDD:", err),
      );

    // Indique à Winston que le traitement est terminé
    callback();
  }
}
