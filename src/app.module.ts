import { Module } from '@nestjs/common';
import { UserModule } from './routes/user/user.module';
import { TrackModule } from './routes/track/track.module';
import { ArtistModule } from './routes/artist/artist.module';
import { AlbumModule } from './routes/album/album.module';

@Module({ imports: [UserModule, TrackModule, ArtistModule, AlbumModule] })
export class AppModule {}
