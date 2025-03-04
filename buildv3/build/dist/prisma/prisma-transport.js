"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaTransport = void 0;
const winston_transport_1 = require("winston-transport");
class PrismaTransport extends winston_transport_1.default {
    constructor(opts) {
        super(opts);
        this.prismaService = opts.prismaService;
    }
    log(info, callback) {
        setImmediate(() => this.emit('logged', info));
        const { level, message, timestamp = new Date().toISOString() } = info;
        this.prismaService.logs
            .create({
            data: {
                level,
                message,
                timestamp: new Date(timestamp).toDateString(),
            },
        })
            .catch((err) => console.error("Erreur lors de l'insertion du log en BDD:", err));
        callback();
    }
}
exports.PrismaTransport = PrismaTransport;
//# sourceMappingURL=prisma-transport.js.map