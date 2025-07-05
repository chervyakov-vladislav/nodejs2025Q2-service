import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Track } from 'src/models/track.model';
import { TrackDto } from 'src/routes/track/dto/track.dto';

@Injectable()
export class TrackRepository {
  tracks: Map<string, Track> = new Map();

  getAll() {
    return Array.from(this.tracks.values());
  }

  getOne(id: string) {
    return this.tracks.get(id) || null;
  }

  create(dto: TrackDto) {
    const id = randomUUID();
    const newTrack = {
      id,
      ...dto,
      albumId: dto.albumId || null,
      artistId: dto.artistId || null,
    };

    this.tracks.set(id, newTrack);

    return newTrack;
  }

  update(id: string, track: Track) {
    this.tracks.set(id, track);

    return track;
  }

  delete(id: string) {
    this.tracks.delete(id);
  }
}
