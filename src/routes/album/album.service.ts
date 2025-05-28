import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';
import { FavoritesEntity } from '../favs/entities/favs.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
  ) {}

  getAlbums() {
    return this.albumRepository.find();
  }

  async getAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  async createAlbum(album: AlbumDto) {
    const newAlbum = this.albumRepository.create(album);
    const savedAlbum = await this.albumRepository.save(newAlbum);

    return savedAlbum;
  }

  async updateAlbum(id: string, dto: AlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new NotFoundException();
    }

    const newAlbum = await this.albumRepository.save({
      ...album,
      ...dto,
    });

    return newAlbum;
  }

  async deleteAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new NotFoundException();
    }

    const [favorites] = await this.favoritesRepository.find();

    if (favorites && favorites.albums) {
      favorites.albums = favorites.albums.filter((albumId) => albumId !== id);
      await this.favoritesRepository.save(favorites);
    }

    await this.albumRepository.delete(id);
  }
}
