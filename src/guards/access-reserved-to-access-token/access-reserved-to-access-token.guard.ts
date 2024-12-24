import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AccessReservedToAccessTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.header('Authorization');

    if (authorization !== "Bearer " +process.env.ACCESS_TOKEN) {
      return false;
    }
    return true;
  }
}
