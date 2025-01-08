import { Test, TestingModule } from '@nestjs/testing';
import { SanityController } from './sanity.controller';
import { ConfigModule } from '../config/config.module';
import { SanityService } from './sanity.service';
import { PrismaService } from '../services/prisma/prisma.service';

describe('SanityController', () => {
  let controller: SanityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [SanityController],
      providers: [SanityService, PrismaService],
    }).compile();

    controller = module.get<SanityController>(SanityController);
  });

  describe('root', () => {
    console.log(process.env.ACCESS_TOKEN);
    it('should return "Hello World!"', () => {
      expect(JSON.stringify(controller.getHello())).toBe(
        JSON.stringify({ greetings: 'Hello World!' }),
      );
    });
  });
});
