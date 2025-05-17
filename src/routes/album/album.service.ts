import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumRepository } from 'src/repositories/album.repository';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  getAlbums() {
    return this.albumRepository.getAll();
  }

  getAlbum(id: string) {
    const album = this.albumRepository.getOne(id);

    if (!album) {
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

    // удалить из избранного
    // удалить из треков
    // 1 тест падает
    // × should set track.albumId = null after delete (7 ms)

    this.albumRepository.delete(id);
  }
}
