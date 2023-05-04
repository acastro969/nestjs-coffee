import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  // A guard is a class annotated with the @Injectable() decorator, which implements the CanActivate interface. Guards have the single responsibility of determining, depending on certain conditions (permissions, roles, etc.), if a given request will be handled by the route handler or not. This is often referred as authorization
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext, // Details about the current request pipeline
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.header('Authorization');
    return authHeader === this.configService.get('API_KEY');
  }
}
