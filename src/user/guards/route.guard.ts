import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JwtPayloadDto } from '../dtos/user.dto';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies.refreshToken || null;

    if (refreshToken) {
      try {
        const verify = <JwtPayloadDto>this.jwtService.verify(refreshToken, {
          secret: process.env.REFRESH_TOKEN_SECRET,
        });
        
        console.log(verify);

        if (verify) {
          return true;
        }
      } catch (error) {
        throw new UnauthorizedException(
          'You are not allowed to access this page!',
        );
      }
    }

    throw new UnauthorizedException('You are not allowed to access this page!');
  }
}
