import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoritesResponse } from './dto/favs.dto';

@Injectable()
export class FavsService {
  constructor() {}

  getFavs(): FavoritesResponse {
    // const {
    //   artists: artistsIds,
    //   albums: albumsIds,
    //   tracks: tracksIds,
    // } = this.favsRepository.getAllId();

    // const artists = artistsIds
    //   .map((id) => this.artistService.getArtist(id, false, true))
    //   .filter(Boolean);
    // const albums = albumsIds
    //   .map((id) => this.albumService.getAlbum(id, false, true))
    //   .filter(Boolean);
    // // const tracks = tracksIds
    // //   .map((id) => this.trackService.getTrack(id, false, true))
    // //   .filter(Boolean);

    return {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  addTrack(id: string) {
    // // this.trackService.getTrack(id, true);
    // this.favsRepository.addTrack(id);
    // return id;
  }

  deleteTrack(id: string) {
    // const isTrackInFavs = this.favsRepository.hasTrack(id);
    // if (!isTrackInFavs && !soft) {
    //   throw new NotFoundException();
    // }
    // this.favsRepository.deleteTrack(id);
  }

  addAlbum(id: string) {
    // this.albumService.getAlbum(id, true);
    // this.favsRepository.addAlbum(id);
    // return id;
  }

  deleteAlbum(id: string) {
    // const isAlbumInFavs = this.favsRepository.hasAlbum(id);
    // if (!isAlbumInFavs && !soft) {
    //   throw new NotFoundException();
    // }
    // this.favsRepository.deleteAlbum(id);
  }

  addArtist(id: string) {
    // this.artistService.getArtist(id, true);
    // this.favsRepository.addArtist(id);
    // return id;
  }

  deleteArtist(id: string) {
    // const isArtistInFavs = this.favsRepository.hasArtist(id);
    // if (!isArtistInFavs && !soft) {
    //   throw new NotFoundException();
    // }
    // this.favsRepository.deleteArtist(id);
  }
}
