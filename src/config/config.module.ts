import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';

@Module({ imports: [Config.forRoot()] })
export class ConfigModule {}
