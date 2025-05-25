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
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getTracks() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  findOneTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.getAlbum(id);
  }

  @Post()
  createUser(@Body() albumDto: AlbumDto) {
    return this.albumService.createAlbum(albumDto);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() albumDto: AlbumDto,
  ) {
    return this.albumService.updateAlbum(id, albumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.albumService.deleteAlbum(id);
  }
}
