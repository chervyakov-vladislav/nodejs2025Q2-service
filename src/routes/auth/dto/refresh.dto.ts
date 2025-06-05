import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RefreshDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  refreshToken: string;
}
