import { Module } from '@nestjs/common';
import { TrackRepository } from 'src/repositories/track.repository';

import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  providers: [TrackService, TrackRepository],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
