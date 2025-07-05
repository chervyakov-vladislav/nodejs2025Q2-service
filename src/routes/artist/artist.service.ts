import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { FavoritesEntity } from '../favs/entities/favs.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
  ) {}

  getArtists() {
    return this.artistRepository.find();
  }

  async getArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  async createArtist(artist: ArtistDto) {
    const newArtist = this.artistRepository.create(artist);
    const savedArtist = await this.artistRepository.save(newArtist);

    return savedArtist;
  }

  async updateArtist(id: string, dto: ArtistDto) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException();
    }

    const newArtist = await this.artistRepository.save({
      id,
      ...dto,
    });

    return newArtist;
  }

  async deleteArtist(id: string) {
    const track = await this.artistRepository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException();
    }

    const [favorites] = await this.favoritesRepository.find();

    if (favorites && favorites.artists) {
      favorites.artists = favorites.artists.filter(
        (artistId) => artistId !== id,
      );
      await this.favoritesRepository.save(favorites);
    }

    await this.artistRepository.delete(id);
  }
}
