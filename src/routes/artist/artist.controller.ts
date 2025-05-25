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
  getTracks() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  findOneTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.getArtist(id);
  }

  @Post()
  createUser(@Body() trackDto: ArtistDto) {
    return this.artistService.createArtist(trackDto);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() trackDto: ArtistDto,
  ) {
    return this.artistService.updateArtist(id, trackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.artistService.deleteArtist(id);
  }
}
