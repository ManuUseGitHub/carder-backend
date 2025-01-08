import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { API_VERSION_ID } from './constents';
import { LoggingInterceptor } from './interceptors/loggingInterceptor/logging.interceptor';
import { AccessReservedToAccessTokenGuard } from './guards/access-reserved-to-access-token/access-reserved-to-access-token.guard';
import { makeAlias } from './aliasHelper';

@UseGuards(AccessReservedToAccessTokenGuard)
@UseInterceptors(LoggingInterceptor)
@Controller(makeAlias(API_VERSION_ID, 'app'))
export class AppController {
  getHello(): any {
    return { greetings: 'Hello World!' };
  }
}
