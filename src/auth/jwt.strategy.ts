import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { SETTINGS } from './constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(SETTINGS.secretEnvVar),
    });
  }

  async validate(payload: any) {
    const { org: orgId, sub: userId, iat } = payload;

    const invalidatedAt = await this.usersService.findUserInvalidatedAtId(
      userId,
    );

    if (invalidatedAt && iat < invalidatedAt / 1_000) {
      throw new UnauthorizedException('Token is no longer valid, please login');
    }

    return { userId, orgId };
  }
}
