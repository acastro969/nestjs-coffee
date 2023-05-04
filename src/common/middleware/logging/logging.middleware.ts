import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // Middlewares are functions executed before the route handler. They have access to the request and response objects and can execute code, make changes to requests and responses, etc.
  use(req: any, res: any, next: () => void) {
    console.time('Request-response time');

    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
