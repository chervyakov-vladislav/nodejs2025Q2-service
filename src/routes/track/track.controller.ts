import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  findOneTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.getTrack(id);
  }

  @Post()
  createUser(@Body() trackDto: TrackDto) {
    return this.trackService.createTrack(trackDto);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() trackDto: TrackDto,
  ) {
    return this.trackService.updateTrack(id, trackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.trackService.deleteTrack(id);
  }
}
