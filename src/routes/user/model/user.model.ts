import { Exclude } from 'class-transformer';

interface IUser {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class User implements IUser {
  id: string;
  login: string;

  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
