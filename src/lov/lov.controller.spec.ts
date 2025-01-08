import { Test, TestingModule } from '@nestjs/testing';
import { LovController } from './lov.controller';
import { ConfigModule } from '../config/config.module';
import { LovModule } from './lov.module';
import { LovService } from './lov.service';
import { PrismaService } from '../services/prisma/prisma.service';

import * as characteristics from '../../test/characteristics.json';

describe('LovController', () => {
  let controller: LovController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LovController],
      imports: [ConfigModule, LovModule],
      providers: [LovService, PrismaService],
    }).compile();

    controller = module.get<LovController>(LovController);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.lov.deleteMany({});
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be possible to get lovs', async () => {
    await controller.addLOVs({
      type: ['irrégulier', 'régulier', 'préposition'],
    } as any);
    const result = await controller.getLovs();
    expect(result.length).not.toBe(0);
  });

  it('should be possible to create lovs', async () => {
    const before = await controller.getLovs();
    await controller.addLOVs(characteristics);
    const after = await controller.getLovs();
    expect(before.length).not.toBe(after.length);
  });
});
