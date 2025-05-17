import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Album } from 'src/models/album.model';
import { AlbumDto } from 'src/routes/album/dto/album.dto';

@Injectable()
export class AlbumRepository {
  albums: Map<string, Album> = new Map();

  getAll() {
    return Array.from(this.albums.values());
  }

  getOne(id: string) {
    return this.albums.get(id) || null;
  }

  create(dto: AlbumDto) {
    const id = randomUUID();
    const album = {
      id,
      ...dto,
      artistId: dto.artistId || null,
    };
    this.albums.set(id, album);

    return album;
  }

  update(id: string, album: Album) {
    this.albums.set(id, album);

    return album;
  }

  delete(id: string) {
    this.albums.delete(id);
  }
}
