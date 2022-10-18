import { Controller, Get, Render } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/register')
  @Render('auth/register')
  root() {
    return this.authService.registerPage();
  }

  @Get('/login')
  @Render('auth/login')
  loginPage() {
    return this.authService.loginPage();
  }
}
