import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Artist } from 'src/models/artist.model';
import { ArtistDto } from 'src/routes/artist/dto/artist.dto';

@Injectable()
export class ArtistRepository {
  artists: Map<string, Artist> = new Map();

  getAll() {
    return Array.from(this.artists.values());
  }

  getOne(id: string) {
    return this.artists.get(id) || null;
  }

  create(dto: ArtistDto) {
    const id = randomUUID();
    const newArtist = {
      id,
      ...dto,
    };
    this.artists.set(id, newArtist);

    return newArtist;
  }

  update(id: string, artist: Artist) {
    this.artists.set(id, artist);

    return artist;
  }

  delete(id: string) {
    this.artists.delete(id);
  }
}
