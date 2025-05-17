import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesRepository {
  artists: string[] = [];
  albums: string[] = [];
  tracks: string[] = [];

  getAllId() {
    return {
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    };
  }

  hasArtist(id: string) {
    return this.artists.includes(id);
  }

  addArtist(id: string) {
    this.artists = Array.from(new Set([...this.artists, id]));
  }

  deleteArtist(id: string) {
    this.artists.filter((artistId) => artistId !== id);
  }

  hasAlbum(id: string) {
    return this.albums.includes(id);
  }

  addAlbum(id: string) {
    this.albums = Array.from(new Set([...this.albums, id]));
  }

  deleteAlbum(id: string) {
    this.albums.filter((albumId) => albumId !== id);
  }

  hasTrack(id: string) {
    return this.tracks.includes(id);
  }

  addTrack(id: string) {
    this.tracks = Array.from(new Set([...this.tracks, id]));
  }

  deleteTrack(id: string) {
    this.tracks.filter((trackId) => trackId !== id);
  }
}
