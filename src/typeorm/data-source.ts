import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from 'src/routes/user/entities/user.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'database',
  synchronize: false,
  entities: [User],
  migrations: ['src/typeorm/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
