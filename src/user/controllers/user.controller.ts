import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { AuthFilter } from '../filters/auth.filters';
import { RouteGuard } from '../guards/route.guard';
import { UserService } from '../services/user.service';
@UseGuards(RouteGuard)
@UseFilters(AuthFilter)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/about')
  @Render('about')
  root() {
    return this.userService.aboutPage();
  }
}
