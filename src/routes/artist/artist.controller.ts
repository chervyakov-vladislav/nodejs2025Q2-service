import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  findOneArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.getArtist(id);
  }

  @Post()
  createArtist(@Body() artistDto: ArtistDto) {
    return this.artistService.createArtist(artistDto);
  }

  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() artistDto: ArtistDto,
  ) {
    return this.artistService.updateArtist(id, artistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.artistService.deleteArtist(id);
  }
}
