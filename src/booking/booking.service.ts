/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/booking.dto'; 
import { Booking } from './booking.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/users/user.service';
import { RoomService } from 'src/rooms/room.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,private userService:UserService,private roomService:RoomService
  ) { }

  getBookings(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }
  // async getBookings(page: number, pageSize: number): Promise<{ booking: Booking[], totalPage: number, currentPage: number }> {
  //   const [booking, total] = await this.bookingRepository.findAndCount({
  //     skip: (page - 1) * pageSize,
  //     take: pageSize,
  //   });

  //   const totalPage = Math.ceil(total / pageSize);
  //   const currentPage = page;

  //   return { booking, totalPage, currentPage };
  // }
//   async findOne(userId: number): Promise<User | undefined> {
//     return await this.bookingRepository.findOne({
//       where: { userId },
//       relations: ['comment'],
//     });
//   }
  
//   async getUserWithPhones(userId: number): Promise<User> {
//     const user = await this.bookingRepository.findOne({
//       where: { userId },
//       relations: ['comment'],
//     });
  
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
  
//     return user;
//   }
async findOneId(bookingId: number): Promise<Booking | undefined> {
  return await this.bookingRepository.findOne({
    where: { bookingId },
    relations: [],
  });
}

async getBookingWith(bookingId: number): Promise<Booking> {
  const booking = await this.bookingRepository.findOne(
    {
      where: { bookingId },
      relations: ['user','room','detailBooking.booking'],
    }
  );
  if (!booking) {
    throw new NotFoundException('Booking not found');
  }
  return booking;
}

async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
  const { userId, roomId } = createBookingDto;

  // Check if the user exists
  const user = await this.userService.findOneId(userId);
  if (!user) {
    throw new NotFoundException(`User with ID ${userId} not found`);
  }

  // Check if the room exists
  const room = await this.roomService.findOneId(roomId);
  if (!room) {
    throw new NotFoundException(`Room with ID ${roomId} not found`);
  }

  const newBooking = this.bookingRepository.create({
    user,
    room,
    ...createBookingDto
  });

  return this.bookingRepository.save(newBooking);
}
// async createBooking(createCommentDto: CreateBookingDto): Promise<Booking> {
//   const { userId } = createCommentDto;

//   // Check if the user exists
//   const user = await this.userService.findOneId(userId);
//   if (!user) {
//     throw new NotFoundException(`User with ID ${userId} not found`);
//   }

//   const newBooking = this.bookingRepository.create({
//     user,
//   });

//   return this.bookingRepository.save(newBooking);
// }

  async updateBooking(bookingId: number, updateBooking: Booking): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { bookingId } });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    Object.assign(booking, updateBooking);
    await this.bookingRepository.save(booking);
    return booking;
  }

  async deleteBooking(bookingId: number): Promise<void> {
    const result = await this.bookingRepository.delete(bookingId);
    if (result.affected === 0) {
      throw new NotFoundException('Booking not found');
    }
  }
}