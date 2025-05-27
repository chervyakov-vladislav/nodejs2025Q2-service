import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'artists' })
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
