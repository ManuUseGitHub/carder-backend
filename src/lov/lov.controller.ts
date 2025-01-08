import { Body, Controller, Get, Post } from '@nestjs/common';
import { Lov } from '@prisma/client';
import { API_VERSION_ID } from '../constents';
import { AddLOVsDTO } from '../dtos/addLOVs';
import { LovService } from './lov.service';
import { PrismaService } from '../services/prisma/prisma.service';
import { makeAlias } from '../aliasHelper';

@Controller(makeAlias(API_VERSION_ID, 'lov'))
export class LovController {
  constructor(
    private lovService: LovService,
    private prismaService: PrismaService,
  ) {}
  @Get()
  getLovs() {
    try {
      const result = this.prismaService.lov.findMany();
      return result;
    } catch (e) {
      throw e;
    }
  }

  @Post()
  async addLOVs(@Body() lovs: AddLOVsDTO) {
    const result = this.lovService.parseCharacteristics(lovs);

    const epicValues: string[] = await this.lovService.getUnexistingLovs(
      result as Lov[],
    );
    const newEntries = result.filter((x) =>
      epicValues.includes(this.lovService.asSimpleLov(x as Lov)),
    );

    const stored = await this.prismaService.lov.createManyAndReturn({
      data: newEntries,
    });
    return stored;
  }
}
