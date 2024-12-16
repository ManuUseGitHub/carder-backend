import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { API_VERSION_ID } from './constents';

@Controller(API_VERSION_ID)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getHello() {
    console.log('receiving');
    return this.appService.getHello();
  }
}
