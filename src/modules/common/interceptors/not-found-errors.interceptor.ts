import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpException } from '@nestjs/common';

@Injectable()
export class NotFoundErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: HttpException) => {
        if (err.getStatus() == 404) {
          console.log('Error en metodo por Id:', err.getResponse());
          throw new HttpException(
            'Revise los elementos de la busqueda',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw err;
      }),
    );
  }
}
