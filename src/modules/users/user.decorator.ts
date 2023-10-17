import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../../interface/user-payload';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userPayload: UserPayload = request.user;

    return userPayload;
  },
);
