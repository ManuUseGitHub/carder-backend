import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { SanityModule } from './sanity/sanity.module';
import { LovModule } from './lov/lov.module';
import { UserModule } from './user/user.module';
import { TitleService } from './title/title.service';
import { TitleController } from './title/title.controller';
import { TitleModule } from './title/title.module';

@Module({
  imports: [ConfigModule, SanityModule, LovModule, UserModule, TitleModule],
  controllers: [AppController, TitleController],
  providers: [TitleService],
})
export class AppModule {}
