import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { LOCAL_STRATEGY_NAME } from '../strategies/local.strategy';

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_STRATEGY_NAME) {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    const {
      loginInput: { username, password },
    } = ctx.getArgs();
    gqlReq.body.username = username;
    gqlReq.body.password = password;
    return gqlReq;
  }
}
