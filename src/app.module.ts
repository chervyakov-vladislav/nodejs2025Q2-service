import { Module } from '@nestjs/common';
import { UserModule } from './routes/user/user.module';
import { TrackModule } from './routes/track/track.module';

@Module({ imports: [UserModule, TrackModule] })
export class AppModule {}
