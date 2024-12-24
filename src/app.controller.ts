import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { API_VERSION_ID } from './constents';
import { AddLOVsDTO } from './dtos/addLOVs';
import { LovService } from './lov/lov.service';
import { PrismaService } from './services/prisma-service/prisma-service.service';
import { PrismaClient } from '@prisma/client';
import { LoggingInterceptor } from './interceptors/loggingInterceptor/logging.interceptor';
import { AccessReservedToAccessTokenGuard } from './guards/access-reserved-to-access-token/access-reserved-to-access-token.guard';
import { hexToUtf8 } from './hexHelper';

const textAPIVersion = hexToUtf8(API_VERSION_ID);

@UseGuards(AccessReservedToAccessTokenGuard)
@UseInterceptors(LoggingInterceptor)
@Controller([API_VERSION_ID, textAPIVersion])
export class AppController {
  constructor(
    private readonly appService: AppService,
    private lovService: LovService,
    private prismaService: PrismaService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('test')
  getLovs() {
    try {
      const prisma = new PrismaClient();
      const result = prisma.lov.findMany();
      console.log('done');
      return result;
    } catch (e) {
      throw e;
    }
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
