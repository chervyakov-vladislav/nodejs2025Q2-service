import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackRepository } from 'src/repositories/track.repository';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  getTracks() {
    return this.trackRepository.getAll();
  }

  getTrack(id: string) {
    const track = this.trackRepository.getOne(id);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  createTrack(track: TrackDto) {
    return this.trackRepository.create(track);
  }

  updateTrack(id: string, dto: TrackDto) {
    const track = this.trackRepository.getOne(id);

    if (!track) {
      throw new NotFoundException();
    }

    return this.trackRepository.update(id, {
      ...track,
      ...dto,
    });
  }

  deleteTrack(id: string) {
    const track = this.trackRepository.getOne(id);

    if (!track) {
      throw new NotFoundException();
    }

    // удалить из избранного
    // удалить из артистров
    // удалить из альбомов

    this.trackRepository.delete(id);
  }
}
