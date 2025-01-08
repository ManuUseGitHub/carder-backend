import { Injectable } from '@nestjs/common';
import { generateTitle } from './fantasyTitleGenerator';

@Injectable()
export class TitleService {
  getRandomTitle(flavour: string) {
    return { title: generateTitle(flavour) };
  }
}
