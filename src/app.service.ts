import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { greetings: process.env.LITTLE_SECRET ?? 'Hello World!' };
  }
}
