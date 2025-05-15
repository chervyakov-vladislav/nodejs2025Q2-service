import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { parse } from 'yaml';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 4000;
  const app = await NestFactory.create(AppModule);
  const document = readFileSync(join(__dirname, '..', 'doc/api.yaml'), 'utf8');
  SwaggerModule.setup('/doc', app, parse(document));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/doc/`);
  });
}

bootstrap();
