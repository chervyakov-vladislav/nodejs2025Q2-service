import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrmConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'host',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || '123',
  database: process.env.POSTGRES_DB || 'postgres',
  autoLoadEntities: true,
  synchronize: false,
});
