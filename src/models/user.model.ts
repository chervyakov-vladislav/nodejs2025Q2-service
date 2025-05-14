import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: 'e1f676cc-6e02-4a29-a734-726529f7e521',
    description: 'uuid v4',
  })
  id: string;

  @ApiProperty({ example: 'somelogin', description: 'user login' })
  login: string;

  password: string;

  @ApiProperty({
    example: 1,
    description: 'integer number, increments on update',
  })
  version: number;

  @ApiProperty({
    example: 1747225465672,
    description: 'timestamp of creation',
  })
  createdAt: number;

  @ApiProperty({
    example: 1747225465672,
    description: 'timestamp of last update',
  })
  updatedAt: number;
}
