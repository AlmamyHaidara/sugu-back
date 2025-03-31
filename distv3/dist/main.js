"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const express = require("express");
const path_1 = require("path");
dotenv.config({ path: process.cwd() + '/.env.development' });
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger({
            transports: [
                new winston.transports.File({ filename: 'combined.log' }),
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.timestamp(), winston.format.printf(({ timestamp, level, message }) => {
                        return `${timestamp} [${level}]: ${message}`;
                    })),
                }),
            ],
            format: winston.format.combine(winston.format.timestamp(), winston.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} [${level}]: ${message}`;
            })),
        }),
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    app.enableCors();
    app.use('/files', express.static((0, path_1.join)(__dirname, '..', 'uploads')));
    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map