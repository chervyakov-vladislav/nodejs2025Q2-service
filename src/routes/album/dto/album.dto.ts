import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class AlbumDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly year: number;

  @IsOptional()
  @IsString()
  @IsUUID('4', { message: 'artistId must be a valid UUID v4' })
  readonly artistId?: string;
}
