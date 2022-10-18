import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndexPage() {
    return { message: 'Hello world' };
  }
}
