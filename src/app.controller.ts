import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { API_VERSION_ID } from './constents';
import { AddLOVsDTO } from './dtos/addLOVs';
import { LovService } from './lov/lov.service';
import { PrismaService } from './services/prisma-service/prisma-service.service';
import { Prisma } from '@prisma/client';

@Controller(API_VERSION_ID)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private lovService: LovService,
    private prismaService: PrismaService,
  ) {}

  @Get('test')
  getHello() {
    return this.appService.getHello();
  }

  @Post('test')
  addLOVs(@Body() lovs: AddLOVsDTO) {
    const result = this.lovService.parseCharacteristics(lovs);

    const stored = this.prismaService.lov.createManyAndReturn({
      data: result,
    });
    return stored;
  }
}
