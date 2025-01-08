import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user.entity';
import { API_VERSION_ID } from '../constents';
import { makeAlias } from '../aliasHelper';

@Controller(makeAlias(API_VERSION_ID, 'user'))
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sync')
  async sync(@Body() user: User) {
    return this.userService.sync(user);
  }

  @Get(':uid')
  async getUserByUid(@Param() parameters: any) {
    return this.userService.getUserByUid(parameters.uid);
  }
}
