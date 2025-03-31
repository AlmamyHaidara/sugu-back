import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as express from 'express';
import { join } from 'path';
dotenv.config({ path: process.cwd() + '/.env.development' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
              return `${timestamp} [${level}]: ${message}`;
            }),
          ),
        }),
      ],
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
    }),
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors(); // Enable CORS if you're dealing with cross-origin requests
  app.use('/files', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
