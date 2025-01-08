import { Test, TestingModule } from '@nestjs/testing';
import { LovService } from './lov.service';
import { UUID_PATTERN } from '../uuidHelper';
import { PrismaService } from '../services/prisma/prisma.service';
import { ConfigModule } from '../config/config.module';
const characteristics = require('../resources/characteristics.json');

describe('LovService', () => {
  let service: LovService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [PrismaService, LovService],
    }).compile();

    service = module.get<LovService>(LovService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.each([
    ['articles', 'ARTI'],
    ['article', 'ARTI'],

    ['role', 'ROLE'],
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

  it('Results to a no addition when the key code unmatches', () => {
    const values = ['test', 'test2', 'test3', 'test4'];
    expect(
      service.parseCharacteristics({
        invalid: values,
      }).length,
    ).not.toBe(values.length);
  });

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
