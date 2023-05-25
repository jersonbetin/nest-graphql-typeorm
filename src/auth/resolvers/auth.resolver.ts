import {
  Resolver,
  GqlExecutionContext,
  Mutation,
  Args,
  Query,
} from '@nestjs/graphql';

import { LoginResult, LoginUserInput } from '../dtos/login.dto';
import { PayloadResponse } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import {
  ExecutionContext,
  UnauthorizedException,
  UseGuards,
  createParamDecorator,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.guard';
import { User } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user as User;
  },
);

@Resolver('Auth')
export class AuthResolver {
  constructor(private _AuthService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResult)
  async login(
    @CurrentUser() user: User,
    @Args('loginInput') userInput: LoginUserInput,
  ): Promise<PayloadResponse> {
    return this._AuthService.createToken(user);
  }

  @Query(() => String)
  async refreshToken(@CurrentUser() user: User): Promise<string> {
    if (!user)
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials',
      );

    const result = await this._AuthService.createToken(user);

    if (result) return result.token;

    throw new UnauthorizedException(
      'Could not log-in with the provided credentials',
    );
  }
}
