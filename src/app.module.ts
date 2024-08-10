/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { RoomModule } from './rooms/room.module';
import { CommentModule } from './comment/comment.module';
import { StaffModule } from './staff/staff.module';
import { ServiceModule } from './services/service.module';
import { BookingModule } from './booking/booking.module';
import { DetailBookingModule } from './detail_booking/detail.module';
import { ImageModule } from './images/image.module';
import { PaymentModule } from './payments/payment.module';
import { AuthModule } from './auth_user/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// request ->middleware ->guard ->interceptor ->response
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pethotel7',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }
  ),
    UserModule,
    RoomModule,
    CommentModule,
    StaffModule,
    ServiceModule,
    BookingModule,
    DetailBookingModule,
    ImageModule,
    PaymentModule,
    AuthModule
  ],
})
export class AppModule {}
