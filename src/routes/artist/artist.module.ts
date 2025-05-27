import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistRepository } from '../../repositories/artist.repository';
import { FavsModule } from '../favs/favs.module';
import { AlbumModule } from '../album/album.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  exports: [ArtistService],
  imports: [forwardRef(() => FavsModule), forwardRef(() => AlbumModule)],
})
export class ArtistModule {}
