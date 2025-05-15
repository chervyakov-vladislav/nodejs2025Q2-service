import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsersRepository } from 'src/repositories/user.repository';
import { User } from 'src/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers() {
    return plainToInstance(User, this.usersRepository.getAll());
  }

  getUser(id: string) {
    const user = this.usersRepository.getOne(id);

    if (!user) {
      throw new NotFoundException('NOT_FOUND');
    }

    return plainToInstance(User, user);
  }

  createUser(dto: CreateUserDto) {
    return plainToInstance(User, this.usersRepository.create(dto));
  }
}
