import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorators';

@Injectable()
export class AccessTokenAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * This guard logic will be -> If the route has isPublic metadata, so skip the authentication
   * @param context ExecutionContext
   * @returns
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //? Check if the route has isPublic metadata
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //? If the route has isPublic metadata, just return true to bypass the guard
    if (isPublic) return true;

    //? Let the jwt auth guard do its work
    return super.canActivate(context);
  }
}
