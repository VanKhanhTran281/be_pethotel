/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
//Kiểm tra vai trò người dùng
//Kiểm tra xem người dùng khi gọi requesst có quyền không thì mới cho truy cập
//Kiểm tra vai trò nếu trả về true sẽ được truy cập
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private roles: string[]){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.roles.includes(request.user.role.toLowerCase());
  }
}
