import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './routes/user/user.module';
import { TrackModule } from './routes/track/track.module';
import { ArtistModule } from './routes/artist/artist.module';
import { AlbumModule } from './routes/album/album.module';
import { FavsModule } from './routes/favs/favs.module';
import { typeOrmConfig as TypeOrmModule } from './typeorm/config';
import { LoggerModule } from './common/logger/logger.module';
import { HttpLoggerMiddleware } from './common/logger/logger.middleware';
import { AuthModule } from './routes/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule,
    LoggerModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    AuthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
