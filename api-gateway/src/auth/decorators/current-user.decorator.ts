import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { AuthRequest } from '../interfaces/auth-request';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
