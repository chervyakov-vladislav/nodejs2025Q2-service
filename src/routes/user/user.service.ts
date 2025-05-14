import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getAll();
  }

  createUser(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }
}
