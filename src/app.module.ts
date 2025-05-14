import { Module } from '@nestjs/common';
import { UserModule } from './routes/user/user.module';

@Module({ imports: [UserModule] })
export class AppModule {}
