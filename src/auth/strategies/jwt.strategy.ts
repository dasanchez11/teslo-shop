import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { email, id } = payload;
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException('Token Not valid');
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'User is not active, talk with admin to activate',
      );
    }

    return user;
  }
}
