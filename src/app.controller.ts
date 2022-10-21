import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('newsfeed')
  root() {
    return this.appService.getIndexPage();
  }
}
