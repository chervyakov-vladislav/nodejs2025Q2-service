import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const publicPaths = ['/auth/signup', '/auth/login', '/doc', '/'];

    if (publicPaths.includes(req.path)) {
      return true;
    }

    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];

    await this.jwtService
      .verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    return true;
  }
}
