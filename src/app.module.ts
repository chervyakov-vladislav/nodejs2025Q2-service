import { Module } from '@nestjs/common';
import { UserModule } from './routes/user/user.module';
import { TrackModule } from './routes/track/track.module';
import { ArtistModule } from './routes/artist/artist.module';
import { AlbumModule } from './routes/album/album.module';
import { FavsModule } from './routes/favs/favs.module';
import { typeOrmConfig as TypeOrmModule } from './typeorm/config';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule,
    LoggerModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
  ],
})
export class AppModule {}
