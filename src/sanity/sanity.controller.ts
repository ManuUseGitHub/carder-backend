import { Controller, Get, Param } from '@nestjs/common';
import { SanityService } from './sanity.service';
import { API_VERSION_ID } from '../constents';
import { makeAlias } from '../aliasHelper';

@Controller(makeAlias(API_VERSION_ID, 'sanity'))
export class SanityController {
  constructor(private readonly service: SanityService) {}
  @Get()
  getHello() {
    return this.service.getHello();
  }
}
