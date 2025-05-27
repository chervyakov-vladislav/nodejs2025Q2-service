import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from '../favs/entities/favs.entity';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, FavoritesEntity])],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
