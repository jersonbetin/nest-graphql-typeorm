import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { PayloadResponse, PayloadToken } from '../models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    private _UserService: UsersService,
    private _JwtService: JwtService,
  ) {}

  async createToken(user: User): Promise<PayloadResponse> {
    const {
      role: { name },
      id,
    } = user;

    const payload: PayloadToken = { role: name, sub: id };
    const token = await this._JwtService.signAsync(payload);
    const response: PayloadResponse = { token, user };

    return response;
  }

  async singIn(username: string, pass: string): Promise<User | null> {
    const user = await this._UserService.findByUsername(username);

    if (user) {
      const { password } = user;
      const match = await compare(pass, password);
      if (match) {
        return user;
      }
    }

    return null;
  }
}
