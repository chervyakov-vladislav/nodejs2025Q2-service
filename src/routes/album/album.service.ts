import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    private readonly favsRepository: Repository<FavoritesEntity>,
  ) {}

  getAlbums() {
    return this.albumRepository.find();
  }

  async getAlbum(id: string, isUnprocessableEntity = false, soft = false) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album && !soft) {
      if (isUnprocessableEntity) {
        throw new UnprocessableEntityException();
      }

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

    // this.favsRepository.deleteAlbum(id, true);
    // DELETE › should set track.albumId = null after delete
    // this.trackService
    //   .getTracks()
    //   .filter((tr) => tr.albumId === id)
    //   .forEach(({ id, name, duration, artistId }) =>
    //     this.trackService.updateTrack(id, {
    //       name,
    //       duration,
    //       artistId,
    //       albumId: null,
    //     }),
    //   );

    await this.albumRepository.delete(id);
  }
}
