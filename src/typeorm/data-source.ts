import 'dotenv/config';
import { DataSource } from 'typeorm';
import { UserEntity } from 'src/routes/user/entities/user.entity';
import { TrackEntity } from 'src/routes/track/entities/track.entity';
import { AlbumEntity } from 'src/routes/album/entities/album.entity';
import { ArtistEntity } from 'src/routes/artist/entities/artist.entity';
import { FavoritesEntity } from 'src/routes/favs/entities/favs.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'database',
  synchronize: false,
  entities: [
    UserEntity,
    TrackEntity,
    AlbumEntity,
    ArtistEntity,
    FavoritesEntity,
  ],
  migrations: ['src/typeorm/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
