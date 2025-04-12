import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
  } from '@nestjs/common';
  
  @Injectable()
  export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user) {
        throw new UnauthorizedException('User not authenticated');
      }
  
      if (user.role !== 'admin') {
        throw new ForbiddenException('Access denied: Admins only');
      }
  
      return true;
    }
  }