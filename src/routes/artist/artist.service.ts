import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ArtistRepository } from 'src/repositories/artist.repository';
import { ArtistDto } from './dto/artist.dto';
import { FavsService } from '../favs/favs.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  getArtists() {
    return this.artistRepository.getAll();
  }

  getArtist(id: string, isUnprocessableEntity = false, soft = false) {
    const artist = this.artistRepository.getOne(id);

    if (!artist && !soft) {
      if (isUnprocessableEntity) {
        throw new UnprocessableEntityException();
      }

      throw new NotFoundException();
    }

    return artist;
  }

  createArtist(artist: ArtistDto) {
    return this.artistRepository.create(artist);
  }

  updateArtist(id: string, dto: ArtistDto) {
    const artist = this.artistRepository.getOne(id);

    if (!artist) {
      throw new NotFoundException();
    }

    return this.artistRepository.update(id, {
      id,
      ...dto,
    });
  }

  deleteArtist(id: string) {
    const track = this.artistRepository.getOne(id);

    if (!track) {
      throw new NotFoundException();
    }

    this.favsService.deleteArtist(id, true);
    this.albumService
      .getAlbums()
      .filter((alb) => alb.artistId === id)
      .forEach(({ id, name, year }) =>
        this.albumService.updateAlbum(id, { name, year, artistId: null }),
      );
    this.trackService
      .getTracks()
      .filter((tr) => tr.artistId === id)
      .forEach(({ id, name, duration, albumId }) =>
        this.trackService.updateTrack(id, {
          name,
          duration,
          albumId,
          artistId: null,
        }),
      );

    this.artistRepository.delete(id);
  }
}
