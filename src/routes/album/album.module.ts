import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from 'src/repositories/album.repository';
import { FavsModule } from '../favs/favs.module';
import { TrackModule } from '../track/track.module';

@Module({
  providers: [AlbumService, AlbumRepository],
  controllers: [AlbumController],
  exports: [AlbumService],
  imports: [forwardRef(() => FavsModule)],
})
export class AlbumModule {}
