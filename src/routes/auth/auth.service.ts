import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY: string;
  private readonly JWT_SECRET_REFRESH_KEY: string;
  private readonly TOKEN_EXPIRE_TIME: string;
  private readonly TOKEN_REFRESH_EXPIRE_TIME: string;

  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'asd';
    this.JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY || 'asd';
    this.TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '5m';
    this.TOKEN_REFRESH_EXPIRE_TIME =
      process.env.TOKEN_REFRESH_EXPIRE_TIME || '3d';
  }

  private generateTokens(id: string, login: string) {
    const payload = { id, login };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.JWT_SECRET_KEY,
      expiresIn: this.TOKEN_EXPIRE_TIME,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.JWT_SECRET_REFRESH_KEY,
      expiresIn: this.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async verifyAccessToken(token: string) {
    const { userId, login } = await this.jwtService.verifyAsync<{
      userId: string;
      login: string;
    }>(token, {
      secret: this.JWT_SECRET_KEY,
    });
    return { userId, login };
  }

  private async verifyRefreshToken(token: string) {
    const { userId, login } = await this.jwtService.verifyAsync<{
      userId: string;
      login: string;
    }>(token, {
      secret: this.JWT_SECRET_REFRESH_KEY,
    });
    return { userId, login };
  }

  async signUp(dto: AuthDto) {
    const { login, password } = dto;

    const isUserExist = await this.authRepository.findOne({ where: { login } });

    if (isUserExist) {
      throw new ConflictException('User is already exist');
    }

    const hashSalt = process.env.CRYPT_SALT || 3;
    const hashedPassword = await bcrypt.hash(password, hashSalt);

    const user = await this.authRepository.save(
      this.authRepository.create({
        login,
        password: hashedPassword,
      }),
    );

    return this.generateTokens(user.id, user.login);
  }

  async login(dto: AuthDto) {
    const { login, password } = dto;

    const user = await this.authRepository.findOne({ where: { login } });

    if (!user) {
      throw new ForbiddenException();
    }

    const isValidPassword = await bcrypt.compare(user.password, password);

    if (!isValidPassword) {
      throw new ForbiddenException();
    }

    return this.generateTokens(user.id, user.login);
  }

  async refresh(dto: RefreshDto) {}
}
