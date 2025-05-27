import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  getArtists() {
    return this.artistRepository.find();
  }

  async getArtist(id: string, isUnprocessableEntity = false, soft = false) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist && !soft) {
      if (isUnprocessableEntity) {
        throw new UnprocessableEntityException();
      }

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

    // this.favsService.deleteArtist(id, true);
    // DELETE › should set album.artistId to null after deletion
    // DELETE › should set track.artistId to null after deletion
    // this.albumService
    //   .getAlbums()
    //   .filter((alb) => alb.artistId === id)
    //   .forEach(({ id, name, year }) =>
    //     this.albumService.updateAlbum(id, { name, year, artistId: null }),
    //   );
    // this.trackService
    //   .getTracks()
    //   .filter((tr) => tr.artistId === id)
    //   .forEach(({ id, name, duration, albumId }) =>
    //     this.trackService.updateTrack(id, {
    //       name,
    //       duration,
    //       albumId,
    //       artistId: null,
    //     }),
    //   );

    await this.artistRepository.delete(id);
  }
}
