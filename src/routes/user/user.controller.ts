import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  findOneUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
}
