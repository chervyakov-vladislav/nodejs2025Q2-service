import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'auth' })
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  login: string;

  @Column()
  password: string;
}
