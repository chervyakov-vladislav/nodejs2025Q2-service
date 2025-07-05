import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsersRepository } from 'src/repositories/user.repository';
import { User } from 'src/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers() {
    return plainToInstance(User, this.usersRepository.getAll());
  }

  getUser(id: string) {
    const user = this.usersRepository.getOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return plainToInstance(User, user);
  }

  createUser(dto: CreateUserDto) {
    return plainToInstance(User, this.usersRepository.create(dto));
  }

  updateUser(id: string, { newPassword, oldPassword }: UpdateUserDto) {
    const user = this.usersRepository.getOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException();
    }

    return plainToInstance(
      User,
      this.usersRepository.update(id, {
        ...user,
        password: newPassword,
      }),
    );
  }

  deleteUser(id: string) {
    const user = this.usersRepository.getOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    this.usersRepository.delete(id);
  }
}
