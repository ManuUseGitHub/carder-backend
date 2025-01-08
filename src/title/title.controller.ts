import { Controller, Get, Param } from '@nestjs/common';
import { TitleService } from './title.service';
import { API_VERSION_ID } from '../constents';
import { makeAlias } from '../aliasHelper';

@Controller(makeAlias(API_VERSION_ID, 'title'))
export class TitleController {
  constructor(private titleService: TitleService) {}
  @Get(':flavour')
  getTitle(@Param() param: any) {
    return this.titleService.getRandomTitle(param.flavour);
  }
}
