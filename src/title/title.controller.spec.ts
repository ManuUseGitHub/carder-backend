import { Test, TestingModule } from '@nestjs/testing';
import { TitleController } from './title.controller';
import { TitleService } from './title.service';

describe('TitleController', () => {
  let controller: TitleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TitleController],
      providers: [TitleService],
    }).compile();

    controller = module.get<TitleController>(TitleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Is possible to fetch different titles', () => {
    function hasDuplicates(array) {
      return new Set(array).size !== array.length;
    }
    const titles: string[] = [];

    let i = 0;
    for (; i < 500; ++i) {
      titles.push(controller.getTitle({ flavour: 'random' }).title);
    }

    console.log(titles.sort());

    expect(hasDuplicates(titles)).toBeFalsy();
  });
});
