import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  // Un guard es una clase anotada con el decorador @Injectable(), que implementa la interfaz CanActivate. Los guards tienen la responsabilidad de determinar, dependiendo de ciertas condiciones (permisos, roles, etc.), si una solicitud será manejada por el route handler o no. Esto se conoce como autorización
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext, // Detalles acerca de la pipeline de solicitudes actuales
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.header('Authorization');
    return authHeader === this.configService.get('API_KEY');
  }
}
