import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesEntity } from '../favs/entities/favs.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(FavoritesEntity)
    private readonly favsRepository: Repository<FavoritesEntity>,
  ) {}

  getTracks() {
    return this.trackRepository.find();
  }

  async getTrack(id: string, isUnprocessableEntity = false, soft = false) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track && !soft) {
      if (isUnprocessableEntity) {
        throw new UnprocessableEntityException();
      }

      throw new NotFoundException();
    }

    return track;
  }

  async createTrack(track: TrackDto) {
    const newTrack = this.trackRepository.create(track);
    const savedTrack = await this.trackRepository.save(newTrack);

    return savedTrack;
  }

  async updateTrack(id: string, dto: TrackDto) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException();
    }

    const savedTrack = await this.trackRepository.save({ ...track, ...dto });

    return savedTrack;
  }

  async deleteTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException();
    }

    // this.favsService.deleteTrack(id, true);
    await this.trackRepository.delete(id);
  }
}
