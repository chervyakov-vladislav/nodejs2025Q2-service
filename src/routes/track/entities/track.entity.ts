import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
