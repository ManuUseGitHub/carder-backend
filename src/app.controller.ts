import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { API_VERSION_ID } from './constents';
import { AddLOVsDTO } from './dtos/addLOVs';
import { PrismaClient } from '@prisma/client';

@Controller(API_VERSION_ID)
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*@Get('test')
  getHello() {
    return this.appService.getHello();
  }*/

  @Get('test')
  getHello() {
    try {
      const prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
      });
      prisma.$on('query', (e) => {
        console.log('Query: ' + e.query);
        console.log('Params: ' + e.params);
        console.log('Duration: ' + e.duration + 'ms');
      });
      const result = prisma.Lov.findMany();
      console.log('done');
      return result;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}
