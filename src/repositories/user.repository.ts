import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { CreateUserDto } from 'src/routes/user/dto/create-user.dto';

@Injectable()
export class UsersRepository {
  users: Map<string, User> = new Map();

  getAll() {
    return Array.from(this.users.values());
  }

  getOne(id: string) {
    return this.users.get(id) || null;
  }

  create(dto: CreateUserDto) {
    const { login, password } = dto;
    const id = randomUUID();
    const newUser = {
      id,
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.set(id, newUser);

    return newUser;
  }

  update(id: string, user: User) {
    this.users.set(id, {
      ...user,
      updatedAt: Date.now(),
      version: user.version + 1,
    });

    return user;
  }

  delete(id: string) {
    this.users.delete(id);
  }
}
