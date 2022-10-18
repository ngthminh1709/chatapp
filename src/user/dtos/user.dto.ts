import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ObjectId } from 'mongoose';

export class RegisterUserDto {
  @IsEmail() email: string;
  @Length(6) password: string;
  @IsNotEmpty() username: string;
}

export class LoginUserDto {
  @IsEmail() email: string;
  @Length(6) password: string;
}

export class LogoutUserDto {
  @IsNotEmpty() id: any;
}

export class JwtPayloadDto {
  id: string;
  role: string;
}

export class UserDto {
  _id: ObjectId;
  email: string;
  username: string;
  password: string;
  role: string;
  phone: string;
  gender: string;
  avatar: string;
  refreshToken: string;
}
