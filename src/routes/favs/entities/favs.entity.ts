import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { array: true, default: () => 'ARRAY[]::uuid[]' })
  artists: string[];

  @Column('uuid', { array: true, default: () => 'ARRAY[]::uuid[]' })
  albums: string[];

  @Column('uuid', { array: true, default: () => 'ARRAY[]::uuid[]' })
  tracks: string[];
}
