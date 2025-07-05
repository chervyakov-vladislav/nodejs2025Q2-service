import { Module } from '@nestjs/common';
import { Logger } from './logger.service';
import { ExceptionFilter } from './logger.filter';

@Module({
  providers: [Logger, ExceptionFilter],
  exports: [Logger, ExceptionFilter],
})
export class LoggerModule {}
