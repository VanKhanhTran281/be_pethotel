/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller'; 
import { BookingService } from './booking.service'; 
import { Booking } from './booking.entity';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import { RoomService } from 'src/rooms/room.service';
import { Room } from 'src/rooms/room.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Booking,User,Room])],
  controllers: [BookingController],
  providers: [BookingService,UserService,RoomService],
  exports: [BookingService]
})
export class BookingModule {}