import { Module } from '@nestjs/common';
import { UserModule } from './routes/user/user.module';
import { TrackModule } from './routes/track/track.module';
import { ArtistModule } from './routes/artist/artist.module';
import { AlbumModule } from './routes/album/album.module';
import { FavsModule } from './routes/favs/favs.module';
import { typeOrmConfig as TypeOrmModule } from './typeorm/config';

@Module({
  imports: [
    TypeOrmModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
  ],
})
export class AppModule {}
