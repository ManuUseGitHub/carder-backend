import { Injectable } from '@nestjs/common';
import { AddLOVsDTO } from '../dtos/addLOVs';
import { Lov } from '../models/lov.entity';
import { v4 as uuidv4 } from 'uuid';
import { getNewEntries } from '../arraysUtils';
import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class LovService {
  constructor(private prisma: PrismaService) {}
  parseCharacteristics(
    characteristics: AddLOVsDTO | { [x: string]: string[] },
  ) {
    const result: Lov[] = [];
    Object.entries(characteristics).map(([key, values]) => {
      const prefix = this.extractPrefix(key);
      if (values) {
        values.map((x) => {
          result.push(this.generateNewLov(prefix, String(x).normalize('NFC')));
        });
      }
    });
    //console.log(result);
    return result.filter((x) => x.key.substring(0, 4) !== 'UNKN');
  }
  extractPrefix(field: string) {
    if (/^article/.test(field)) {
      return 'ARTI';
    }
    if (/^role/.test(field)) {
      return 'ROLE';
    }
    if (/^fromTo/i.test(field)) {
      return 'FRM2';
    }
    if (/^type/i.test(field)) {
      return 'GTYP';
    }
    if (/^part/i.test(field)) {
      return 'PART';
    }
    if (/^theme/i.test(field)) {
      return 'THEM';
    }
    if (/^chapter/i.test(field)) {
      return 'CHAP';
    }
    if (/^tag/i.test(field)) {
      return 'TAGS';
    }
    if (/^difficult/i.test(field)) {
      return 'DIFC';
    }
    return 'UNKN';
  }
  generateNewLov(prefix: string, value) {
    return {
      key: `${prefix}-${uuidv4()}`,
      value: value,
      shared: false,
    };
  }

  async getUnexistingLovs(result: Lov[]) {
    const existing = new Set(
      (await this.prisma.lov.findMany()).map(this.asSimpleLov).sort(),
    );
    const inComing = new Set(result.map(this.asSimpleLov).sort());
    return getNewEntries([...inComing], [...existing]);
  }

  asSimpleLov = (x: Lov) =>
    `${x.key.substring(0, 4)}(${x.value.toLowerCase()})`;
}
