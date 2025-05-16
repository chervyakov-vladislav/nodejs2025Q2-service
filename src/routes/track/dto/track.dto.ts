import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;

  @IsOptional()
  @IsString()
  @IsUUID('4', { message: 'artistId must be a valid UUID v4' })
  readonly artistId?: string;

  @IsOptional()
  @IsString()
  @IsUUID('4', { message: 'albumId must be a valid UUID v4' })
  readonly albumId?: string;
}
