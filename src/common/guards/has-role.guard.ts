import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/users/enums';
import { ROLES_KEY } from '../decorators';

@Injectable()
export class HasRoleGuard implements CanActivate {
  //* Inject Reflector helper class
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //? If no roles are specified for that route, bypass the guard
    if (!requiredRoles) return true;

    //* Get the user instance from the request (added from AT strategy)
    const { user } = context.switchToHttp().getRequest();

    //* Check if the user has the role required.
    return requiredRoles.some((role) => user.role === role);
    // The some() method tests whether at least one element in the array passes the test implemented by the provided function
  }
}
