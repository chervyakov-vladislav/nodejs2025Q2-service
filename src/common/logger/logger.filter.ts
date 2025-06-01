import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as NestExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from './logger.service';
import { Request } from 'express';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    this.logger.error(
      `${request.method} ${request.url} ${httpStatus} ${exception instanceof Error ? exception.message : ''}`,
      exception instanceof Error ? exception.stack : undefined,
      `HTTP`,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
