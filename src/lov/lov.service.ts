import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AddLOVsDTO } from 'src/dtos/addLOVs';
import { Lov } from 'src/models/lov.entity';

@Injectable()
export class LovService {
  parseCharacteristics(characteristics: AddLOVsDTO) {
    console.log(characteristics);
    const result: Lov[] = [];
    Object.entries(characteristics).map(([key, values]) => {
      const prefix = this.extractPrefix(key);
      if (values) {
        values.map((x) => {
          result.push(this.generateNewLov(prefix, String(x).normalize('NFC')));
        });
      }
    });
    console.log(result);
    return result;
  }
  extractPrefix(field: string) {
    if (/^article/.test(field)) {
      return 'ARTI';
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
      key: `${prefix}-${randomUUID()}`,
      value: value,
      shared: false,
    };
  }
}
