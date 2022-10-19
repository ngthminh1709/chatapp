import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginUserDto, RegisterUserDto } from '../dtos/user.dto';
import { AuthFilter } from '../filters/auth.filters';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';
@Controller('/auth')
@UseGuards(AuthGuard)
@UseFilters(AuthFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/register')
  @Render('register')
  root() {
    return this.authService.registerPage();
  }

  @Get('/login')
  @Render('login')
  loginPage() {
    return this.authService.loginPage();
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginUserDto, res);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }

  @Post('/get-refresh-token')
  @HttpCode(HttpStatus.OK)
  getRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.getRefreshToken(req, res);
  }
}
