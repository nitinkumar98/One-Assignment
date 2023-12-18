import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  userSignUp(@Body() body: any) {
    return this.usersService.userSignUp(body);
  }

  @Post('login')
  userLogin(@Body() body: any) {
    return this.usersService.userLogin(body);
  }
}
