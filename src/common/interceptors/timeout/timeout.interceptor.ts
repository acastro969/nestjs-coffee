import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  // Interceptors are a type of functionality in NestJS that can be used to perform various tasks before or after a method is executed. They can be used to add extra logic, transform the result or exception of a function, extend basic function behavior, or completely override a function based on specific conditions. Interceptors work by implementing the intercept() method, which takes two arguments: an instance of ExecutionContext (provides additional details about the current execution process), and a CallHandler instance
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(30000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
