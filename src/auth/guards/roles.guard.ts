import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from 'src/users/entities/role.entity';
import { ROLE_KEY } from '../decorators/roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC } from '../decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<ROLES[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context).getContext();
    const request = ctx.req;

    return roles.includes(request?.user?.role);
  }
}
