import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesEntity } from './entities/favs.entity';
import { AlbumEntity } from 'src/routes/album/entities/album.entity';
import { ArtistEntity } from 'src/routes/artist/entities/artist.entity';
import { TrackEntity } from 'src/routes/track/entities/track.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  private async getOrCreateFavorites() {
    let [favorites] = await this.favoritesRepository.find();
    if (!favorites) {
      favorites = this.favoritesRepository.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      await this.favoritesRepository.save(favorites);
    }
    return favorites;
  }

  async getFavs() {
    const {
      artists: artistsIds,
      albums: albumsIds,
      tracks: tracksIds,
    } = await this.getOrCreateFavorites();

    const [artists, albums, tracks] = await Promise.all([
      this.artistRepository.find({
        where: { id: In(artistsIds) },
      }),
      this.albumRepository.find({
        where: { id: In(albumsIds) },
      }),
      this.trackRepository.find({
        where: { id: In(tracksIds) },
      }),
    ]);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new UnprocessableEntityException();
    }

    const favorites = await this.getOrCreateFavorites();
    favorites.tracks.push(id);
    await this.favoritesRepository.save(favorites);

    return id;
  }

  async deleteTrack(id: string) {
    const favorites = await this.getOrCreateFavorites();

    if (!favorites.tracks.includes(id)) {
      throw new NotFoundException();
    }

    favorites.tracks = favorites.tracks.filter((trackId) => trackId !== id);
    await this.favoritesRepository.save(favorites);
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new UnprocessableEntityException();
    }

    const favorites = await this.getOrCreateFavorites();

    favorites.albums.push(id);
    await this.favoritesRepository.save(favorites);

    return id;
  }

  async deleteAlbum(id: string) {
    const favorites = await this.getOrCreateFavorites();

    if (!favorites.albums.includes(id)) {
      throw new NotFoundException();
    }

    favorites.albums = favorites.albums.filter((albumId) => albumId !== id);
    await this.favoritesRepository.save(favorites);
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    const favorites = await this.getOrCreateFavorites();

    favorites.artists.push(id);
    await this.favoritesRepository.save(favorites);

    return id;
  }

  async deleteArtist(id: string) {
    const favorites = await this.getOrCreateFavorites();

    if (!favorites.artists.includes(id)) {
      throw new NotFoundException();
    }

    favorites.artists = favorites.artists.filter((artistId) => artistId !== id);
    await this.favoritesRepository.save(favorites);
  }
}
