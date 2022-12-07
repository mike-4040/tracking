import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type { UserAuth } from './types';

type UserProp = keyof UserAuth;

export const UserDecor = createParamDecorator(
  (propName: UserProp, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;

    return propName ? user?.[propName] : user;
  },
);
