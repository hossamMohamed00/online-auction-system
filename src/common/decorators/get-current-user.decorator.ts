import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    //? The user object is attached to the request from passport strategy.
    if (!data) return request.user;

    return request.user[data]; //* like request.user['_id']
  }
);
