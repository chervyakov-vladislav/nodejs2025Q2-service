import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'somelogin', description: 'user login' })
  readonly login: string;

  @ApiProperty({ example: 'somepassword', description: 'user password' })
  readonly password: string;
}
