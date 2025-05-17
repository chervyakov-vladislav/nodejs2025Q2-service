import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TrackRepository } from 'src/repositories/track.repository';
import { TrackDto } from './dto/track.dto';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  getTracks() {
    return this.trackRepository.getAll();
  }

  getTrack(id: string, isUnprocessableEntity = false, soft = false) {
    const track = this.trackRepository.getOne(id);

    if (!track && !soft) {
      if (isUnprocessableEntity) {
        throw new UnprocessableEntityException();
      }

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

    this.favsService.deleteTrack(id, true);
    this.trackRepository.delete(id);
  }
}
