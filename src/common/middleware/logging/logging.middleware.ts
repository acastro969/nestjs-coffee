import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // Los middlewares son funciones ejecutadas antes del controlador de ruta. Tienen acceso a los objetos de solicitud y respuesta y pueden ejecutar código, realizar cambios en las solicitudes y respuestas, etc.
  use(req: any, res: any, next: () => void) {
    console.time('Request-response time');

    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
