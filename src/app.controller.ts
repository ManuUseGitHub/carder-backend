import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { API_VERSION_ID } from './constents';
import { AddLOVsDTO } from './dtos/addLOVs';
@Controller(API_VERSION_ID)
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('test')
  getHello() {
    return this.appService.getHello();
  }
}
