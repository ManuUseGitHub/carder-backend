import { Module } from '@nestjs/common';
import { SanityController } from './sanity.controller';
import { SanityService } from './sanity.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [SanityController],
  providers: [SanityService],
})
export class SanityModule {}
