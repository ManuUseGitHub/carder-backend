import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { LovService } from './lov/lov.service';
import { PrismaService } from './services/prisma-service/prisma-service.service';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService, LovService, PrismaService],
})
export class AppModule {}
