import { Module } from '@nestjs/common';
import { UserModule } from './routes/user/user.module';
import { TrackModule } from './routes/track/track.module';
import { ArtistModule } from './routes/artist/artist.module';

@Module({ imports: [UserModule, TrackModule, ArtistModule] })
export class AppModule {}
