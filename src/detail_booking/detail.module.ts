/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailBookingController } from './detail.controller';
import { DetailBookingService } from './detail.service';
import { DetailBooking } from './detail.entity';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import { Booking } from 'src/booking/booking.entity';
import { Staff } from 'src/staff/staff.entity';
import { Service } from 'src/services/service.entity';
import { BookingService } from 'src/booking/booking.service';
import { StaffService } from 'src/staff/staff.service';
import { ServiceService } from 'src/services/service.service';
import { Room } from 'src/rooms/room.entity';
import { RoomService } from 'src/rooms/room.service';


@Module({
  imports: [TypeOrmModule.forFeature([DetailBooking,User,Booking,Staff,Service,Room])],
  controllers: [DetailBookingController],
  providers: [DetailBookingService,UserService,BookingService,StaffService,ServiceService,RoomService],
  exports: [DetailBookingService]
})
export class DetailBookingModule {}