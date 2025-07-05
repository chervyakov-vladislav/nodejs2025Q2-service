import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dto/refresh.dto';
import { UserEntity } from 'src/routes/user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY: string;
  private readonly JWT_SECRET_REFRESH_KEY: string;
  private readonly TOKEN_EXPIRE_TIME: string;
  private readonly TOKEN_REFRESH_EXPIRE_TIME: string;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'asd';
    this.JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY || 'asd';
    this.TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '5m';
    this.TOKEN_REFRESH_EXPIRE_TIME =
      process.env.TOKEN_REFRESH_EXPIRE_TIME || '3d';
  }

  private generateTokens(userId: string, login: string) {
    const payload = { userId, login };

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
    const { id } = await this.userService.createUser(dto);

    return { id };
  }

  async login(dto: AuthDto) {
    const { login, password } = dto;

    const user = await this.userRepository.findOne({ where: { login } });

    if (!user) {
      throw new ForbiddenException();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new ForbiddenException();
    }

    return this.generateTokens(user.id, user.login);
  }

  async refresh(dto: RefreshDto) {
    if (!dto.refreshToken) throw new UnauthorizedException();

    try {
      const { login, userId } = await this.verifyRefreshToken(dto.refreshToken);

      return this.generateTokens(userId, login);
    } catch {
      throw new ForbiddenException();
    }
  }
}
