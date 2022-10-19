import { Module } from '@nestjs/common';
import { AuthController } from '../user/controllers/auth.controller';
import { AuthService } from '../user/services/auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
