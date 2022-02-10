import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetRefreshToken = createParamDecorator(
  (data: never | undefined, context: ExecutionContext): string => {
    const req = context.switchToHttp().getRequest();

    //? Extract the refresh token from the Authorization header
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();

    return refreshToken;
  },
);
