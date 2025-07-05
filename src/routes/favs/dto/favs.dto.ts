import { Artist } from 'src/models/artist.model';
import { Album } from 'src/models/album.model';
import { Track } from 'src/models/track.model';

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
