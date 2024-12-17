import { Test, TestingModule } from '@nestjs/testing';
import { LovService } from './lov.service';
import { UUID_PATTERN } from '../uuidHelper';
const characteristics = require('../resources/characteristics.json');

describe('LovService', () => {
  let service: LovService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LovService],
    }).compile();

    service = module.get<LovService>(LovService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.each([
    ['articles', 'ARTI'],
    ['article', 'ARTI'],
    ['something containing article', 'UNKN'],

    ['fromTo', 'FRM2'],
    ['themes', 'THEM'],
    ['parts', 'PART'],
    ['type', 'GTYP'],
    ['tags', 'TAGS'],
    ['chapter', 'CHAP'],
    ['difficulties', 'DIFC'],
  ])(
    'The property/field starting by [%s] should match the key code [%s]',
    (challange, expectation) => {
      expect(service.extractPrefix(challange)).toBe(expectation);
    },
  );
  it('should match the format', () => {
    const prefix = service.extractPrefix('article');
    const lov = service.generateNewLov(prefix, 'der');
    expect(lov.key).toMatch(RegExp(`${'^[A-Z\d]{4}'}-${UUID_PATTERN}`));
  });

  it('should create a list of values from object', () => {
    const result: { key: string; value: string }[] =
      service.parseCharacteristics(characteristics);
    expect(result.length).not.toEqual(0);
    expect(JSON.stringify(result)).not.toMatch(/UNKN-/g);
  });
});
