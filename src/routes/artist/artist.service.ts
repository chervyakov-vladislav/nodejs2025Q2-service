import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistRepository } from 'src/repositories/artist.repository';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  getArtists() {
    return this.artistRepository.getAll();
  }

  getArtist(id: string) {
    const artist = this.artistRepository.getOne(id);

    if (!artist) {
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

    // удалить из избранного
    // удалить альбомы исполнителя
    // удалить треки исполнителя
    // пока что 2 теста подают
    // × should set track.artistId to null after deletion (9 ms)
    // × should set album.artistId to null after deletion (6 ms)

    this.artistRepository.delete(id);
  }
}
