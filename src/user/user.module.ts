import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserSchema } from './models/user.model';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, AuthGuard],
})
export class UserModule {}
