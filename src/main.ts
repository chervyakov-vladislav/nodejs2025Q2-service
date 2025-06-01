import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { Logger } from './common/logger/logger.service';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 4000;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));

  const document = readFileSync(join(__dirname, '..', 'doc/api.yaml'), 'utf8');
  SwaggerModule.setup('/doc', app, parse(document));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(PORT, () => {
    const logger = app.get(Logger);
    logger.log(`Server started on http://localhost:${PORT}`);
    logger.log(`Swagger: http://localhost:${PORT}/doc/`);
  });
}

bootstrap();
