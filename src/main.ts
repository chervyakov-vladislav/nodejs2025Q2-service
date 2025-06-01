import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { Logger } from './common/logger/logger.service';
import { ExceptionFilter } from './common/logger/logger.filter';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 4000;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));
  const logger = app.get(Logger);

  process.on('uncaughtException', (err) => {
    logger.fatal(err.message, 'Uncaught Exception');
    logger.error(err.stack, 'Uncaught Exception');
    logger.error('The application will shut down in 1 second');

    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });

  process.on('unhandledRejection', (reason) => {
    logger.fatal(reason, 'Unhandled Rejection');
    logger.error(
      reason instanceof Error ? reason.stack : String(reason),
      'Unhandled Rejection:',
    );
    logger.error('The application will shut down in 1 second');

    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });

  const document = readFileSync(join(__dirname, '..', 'doc/api.yaml'), 'utf8');
  SwaggerModule.setup('/doc', app, parse(document));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter, logger));

  await app.listen(PORT, () => {
    logger.log(`Server started on http://localhost:${PORT}`);
    logger.log(`Swagger: http://localhost:${PORT}/doc/`);
  });
}

bootstrap();
