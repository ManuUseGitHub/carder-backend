import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
const fs = require('fs');

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        appendMessage(err + '\n');
        throw new Error(err);
      }),
    );
  }
}
export function appendMessage(message: string) {
  fs.appendFile('message.txt', message, function (err) {
    if (err) throw err;
  });
}
