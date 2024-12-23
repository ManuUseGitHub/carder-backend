import { Injectable, OnModuleInit, UseInterceptors } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  appendMessage,
  LoggingInterceptor,
} from 'src/interceptors/loggingInterceptor/logging.interceptor';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      appendMessage(err.toString());//
    }
  }
}
