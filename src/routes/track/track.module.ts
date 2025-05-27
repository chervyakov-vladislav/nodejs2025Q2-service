import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { FavoritesEntity } from '../favs/entities/favs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity, FavoritesEntity])],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
