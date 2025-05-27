import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArtistEntity } from 'src/routes/artist/entities/artist.entity';
import { AlbumEntity } from 'src/routes/album/entities/album.entity';

@Entity({ name: 'tracks' })
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  // @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
  //   nullable: true,
  //   onDelete: 'SET NULL',
  // })
  // @JoinColumn({ name: 'artistId' })
  // artist: ArtistEntity;

  // @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
  //   nullable: true,
  //   onDelete: 'SET NULL',
  // })
  // @JoinColumn({ name: 'albumId' })
  // album: AlbumEntity;
}
