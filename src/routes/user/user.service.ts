import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { User } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    const users = await this.usersRepository.find();

    return plainToInstance(User, users);
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return plainToInstance(User, user);
  }

  async createUser(dto: CreateUserDto) {
    const { login, password } = dto;
    const date = Date.now();
    const hashSalt = Number(process.env.CRYPT_SALT) || 3;
    const hashedPassword = await bcrypt.hash(password, hashSalt);

    const user = this.usersRepository.create({
      createdAt: date,
      updatedAt: date,
      password: hashedPassword,
      login,
    });
    const savedUser = await this.usersRepository.save(user);

    return plainToInstance(User, savedUser);
  }

  async updateUser(id: string, { newPassword, oldPassword }: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isValidPassword) {
      throw new ForbiddenException();
    }

    user.password = newPassword;
    user.updatedAt = Date.now();

    const updatedUser = await this.usersRepository.save(user);

    return plainToInstance(User, updatedUser);
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    await this.usersRepository.delete(id);
  }
}
