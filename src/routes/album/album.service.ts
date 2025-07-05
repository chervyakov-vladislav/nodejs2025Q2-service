import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumRepository } from 'src/repositories/album.repository';
import { AlbumDto } from './dto/album.dto';
import { FavsService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  getAlbums() {
    return this.albumRepository.getAll();
  }

  getAlbum(id: string, isUnprocessableEntity = false, soft = false) {
    const album = this.albumRepository.getOne(id);

    if (!album && !soft) {
      if (isUnprocessableEntity) {
        throw new UnprocessableEntityException();
      }

      throw new NotFoundException();
    }

    return album;
  }

  createAlbum(album: AlbumDto) {
    return this.albumRepository.create(album);
  }

  updateAlbum(id: string, dto: AlbumDto) {
    const album = this.albumRepository.getOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    return this.albumRepository.update(id, {
      ...album,
      ...dto,
    });
  }

  deleteAlbum(id: string) {
    const album = this.albumRepository.getOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    this.favsService.deleteAlbum(id, true);
    this.trackService
      .getTracks()
      .filter((tr) => tr.albumId === id)
      .forEach(({ id, name, duration, artistId }) =>
        this.trackService.updateTrack(id, {
          name,
          duration,
          artistId,
          albumId: null,
        }),
      );

    this.albumRepository.delete(id);
  }
}
