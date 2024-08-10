/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

//Sử dụng để khi tạo mới một comment hệ thống sẽ lưu được id của người dùng tạo comment đó
@Injectable()
export class JwtInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const userId = request.user.id;
      
        // Modify the createCommentDto to include the userId
        const body = request.body;
        request.body = { ...body, userId };
      
        return next.handle();
      }
}
