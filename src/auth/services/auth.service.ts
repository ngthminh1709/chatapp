import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  registerPage() {
    return { message: 'Register Page' };
  }

  loginPage() {
    return { message: 'Login Page' };
  }
}
