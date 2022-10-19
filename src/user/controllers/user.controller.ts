import { Controller, Get, Render } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @Render('user/profile')
  root() {
    return this.userService.profilePage();
  }
}
