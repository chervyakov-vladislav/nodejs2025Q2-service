import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favService: FavsService) {}

  @Get('/')
  getFavs() {
    return this.favService.getFavs();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favService.deleteTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favService.deleteAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favService.deleteArtist(id);
  }
}
