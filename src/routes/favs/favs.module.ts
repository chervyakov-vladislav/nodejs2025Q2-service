import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistEntity } from 'src/routes/artist/entities/artist.entity';
import { AlbumEntity } from 'src/routes/album/entities/album.entity';
import { TrackEntity } from 'src/routes/track/entities/track.entity';
import { FavoritesEntity } from './entities/favs.entity';

@Module({
  providers: [FavsService],
  controllers: [FavsController],
  imports: [
    TypeOrmModule.forFeature([
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
      FavoritesEntity,
    ]),
  ],
})
export class FavsModule {}
