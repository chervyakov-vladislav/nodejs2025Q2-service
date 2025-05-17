import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from 'src/repositories/album.repository';

@Module({
  providers: [AlbumService, AlbumRepository],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
