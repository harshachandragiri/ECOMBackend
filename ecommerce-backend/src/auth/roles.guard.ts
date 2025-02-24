// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from './roles.decorator';
// import { Role } from './roles.enum';
// import { Request } from 'express';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true; // If no roles are specified, allow access
//     }

//     const request = context.switchToHttp().getRequest<Request>();
//     const user = request.user;

//     return user && requiredRoles.includes(user.role);
//   }
// }
// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Request } from 'express';  // ✅ Import Request from express

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!requiredRoles) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest<Request>();
//     const user = request.user as { role: string };  // ✅ Explicitly define user type

//     return user && requiredRoles.includes(user.role);
//   }
// }
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    
    const user = request.user; // ✅ Now TypeScript recognizes request.user

    // return user && requiredRoles.includes(user.role);
    return user?.role ? requiredRoles.includes(user.role) : false;


  }
}
