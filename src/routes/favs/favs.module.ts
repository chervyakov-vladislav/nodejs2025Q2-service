import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [FavsService],
  controllers: [FavsController],
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
})
export class FavsModule {}
