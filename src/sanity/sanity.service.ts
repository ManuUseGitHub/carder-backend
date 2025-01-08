import { Injectable } from '@nestjs/common';
import { generateTitle } from '../title/fantasyTitleGenerator';

@Injectable()
export class SanityService {
  getHello() {
    return { greetings: process.env.LITTLE_SECRET ?? 'Hello World!' };
  }
}
