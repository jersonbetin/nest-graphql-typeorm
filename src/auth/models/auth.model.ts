import { User } from 'src/users/entities/user.entity';

export interface PayloadResponse {
  token: string;
  user: User;
}

export interface PayloadToken {
  role: string;
  sub: number | string;
}
