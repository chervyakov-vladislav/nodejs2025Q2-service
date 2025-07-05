import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TrackEntity } from 'src/routes/track/entities/track.entity';
import { AlbumEntity } from '../../album/entities/album.entity';

@Entity({ name: 'artists' })
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[];
}
