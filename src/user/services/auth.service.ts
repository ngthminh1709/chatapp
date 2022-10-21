import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
// import * as bcrypt from 'bcrypt';
import { Request, response, Response } from 'express';
import { Model } from 'mongoose';
import {
  JwtPayloadDto,
  LoginUserDto,
  RegisterUserDto,
  UserDto,
} from '../dtos/user.dto';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  registerPage() {
    return { message: 'Register Page!' };
  }

  loginPage() {
    return { message: 'Login Page!' };
  }

  logoutPage() {
    return { message: 'Logout Page!' };
  }

  async register(registerUserDto: RegisterUserDto) {
    const { email, username, password } = registerUserDto;
    try {
      const currentUser = await this.userModel
        .findOne({
          email: email,
        })
        .exec();

      if (currentUser)
        throw new HttpException(
          'Email or username is already registered!',
          HttpStatus.CONFLICT,
        );

      // const hashPassword = await bcrypt.hash(password, 10);
      const hashPassword = password;

      await this.userModel.create({
        email,
        username,
        password: hashPassword,
      });
      return { success: true, message: 'Register Successfully!' };
    } catch (err) {
      console.log(err);
      throw new HttpException(err.response, err.status);
    }
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;

    try {
      const user = <UserDto>await this.userModel.findOne({ email });

      if (!user) {
        throw new HttpException(
          'Email is not registered!',
          HttpStatus.NOT_FOUND,
        );
      }

      // const checker = await bcrypt.compare(password, user.password);
      const checker = true;

      if (!checker) {
        throw new HttpException(
          'Password is not correct!',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const tokens = await this._generateToken(user);

      const loggedUser = <UserDto>await this.userModel.findByIdAndUpdate(
        user._id,
        {
          refreshToken: tokens.refreshToken,
        },
        { new: true, select: '-password' },
      );

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });

      return {
        success: true,
        user: loggedUser,
        acessToken: tokens.accessToken,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(err.response, err.status);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const refreshToken = req?.cookies?.refreshToken || null;

      if (!refreshToken) {
        throw new HttpException(
          'Refresh Token not Found!',
          HttpStatus.NOT_FOUND,
        );
      }

      const { id } = <JwtPayloadDto>this.jwtService.decode(refreshToken);

      await this.userModel.findByIdAndUpdate(id, {
        refreshToken: '',
      });
      res.cookie('refreshToken', '', {
        maxAge: -1,
        path: '/',
      });

      return { success: true, message: 'User Logged Out!' };
    } catch (err) {
      console.log(err);
      throw new HttpException(err.response, err.status);
    }
  }

  async getRefreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req?.cookies?.refreshToken || null;
      const user = await this.userModel.findOne({ refreshToken: refreshToken });

      if (!refreshToken || !user) {
        throw new HttpException('Token is not valid!', HttpStatus.BAD_REQUEST);
      }

      const tokens = await this._generateToken(user);

      const refreshedUser = await this.userModel.findByIdAndUpdate(user._id, {
        refreshToken: tokens.refreshToken,
      });

      await res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });

      return {
        success: true,
        user: refreshedUser,
        acessToken: tokens.accessToken,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(err.response, err.status);
    }
  }

  async _generateToken(user: any) {
    const accessToken = this.jwtService.sign(
      {
        id: user._id,
        role: user.role,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '1d',
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        id: user._id,
        role: user.role,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '365d',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
