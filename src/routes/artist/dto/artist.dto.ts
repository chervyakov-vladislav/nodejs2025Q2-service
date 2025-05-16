import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ArtistDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly grammy: boolean;
}
