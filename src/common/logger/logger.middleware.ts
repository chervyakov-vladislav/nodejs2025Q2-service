import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from './logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body: reqBody, query } = req;
    const start = Date.now();

    const oldSend = res.send;
    let responseBody: any;

    res.send = function (body, ...args) {
      responseBody = body;
      return oldSend.apply(this, [body, ...args]);
    };

    res.on('finish', () => {
      const duration = Date.now() - start;
      const parts = [
        `${method} ${originalUrl} ${res.statusCode} - ${duration}ms`,
      ];

      if (query && Object.keys(query).length > 0) {
        parts.push(`Query: ${JSON.stringify(query)}`);
      }
      if (reqBody && Object.keys(reqBody).length > 0) {
        parts.push(`Request: ${JSON.stringify(reqBody)}`);
      }
      if (responseBody && responseBody !== undefined && responseBody !== '') {
        parts.push(
          `Response: ${typeof responseBody === 'object' ? JSON.stringify(responseBody) : responseBody}`,
        );
      }

      this.logger.log(parts.join(' | '), 'HTTP');
    });

    next();
  }
}
