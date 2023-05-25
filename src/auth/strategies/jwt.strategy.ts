import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from 'src/config';
import { PayloadToken } from '../models/auth.model';

export const JWT_STRATEGY_NAME = 'jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_NAME) {
  constructor(
    @Inject(config.KEY) private _ConfigService: ConfigType<typeof config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _ConfigService.jwtSecret,
    });
  }

  async validate(payload: PayloadToken) {
    console.log('payload', payload);

    return payload;
  }
}
