import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(JSON.stringify(appController.getHello())).toBe(
        JSON.stringify({ greetings: 'Hello World!' }),
      );
    });
  });
});

/*
{
		uid:"aSO3CKrmpIR52eJwxyhrCzP4isA3",
		displayName:"",
		photoURL:"",
		phoneNumber:"",
		email:"jean.luc.e.verhan@gmail.com"
	}
*/