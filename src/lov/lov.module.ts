import { Module } from '@nestjs/common';
import { LovController } from './lov.controller';
import { PrismaService } from '../services/prisma/prisma.service';
import { LovService } from './lov.service';

@Module({
  imports: [],
  controllers: [LovController],
  providers: [PrismaService, LovService],
})
export class LovModule {}
