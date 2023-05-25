import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { User } from 'src/users/entities/user.entity';

export const LOCAL_STRATEGY_NAME = 'local';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  LOCAL_STRATEGY_NAME,
) {
  constructor(private _AuthService: AuthService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this._AuthService.singIn(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return user;
  }
}
