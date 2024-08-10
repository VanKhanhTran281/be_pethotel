/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { UserService } from 'src/users/user.service';

@Injectable()
//Xác thực người dùng, kiểm soát quyền truy cập của tài khoản
// Trích xuất token từ header của request.
// Verify token sử dụng jwtService.
// Gán payload của token vào request object.
// Trả về true nếu xác thực thành công, để cho phép route được truy cập.
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userService: UserService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      // const user= await this.userService.findOnee(payload.userId)
      request['user'] = payload;
      // request.user = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}