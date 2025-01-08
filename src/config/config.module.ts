import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import { configuration } from './consfiguraiton';

const env = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';

@Module({
  imports: [
    Config.forRoot({
      envFilePath: `${process.cwd()}/.env${env}`,
      load: [configuration],
    }),
  ],
})
export class ConfigModule {}
