/* eslint-disable prettier/prettier */
import {  Body, Controller,  Delete,  Get, NotFoundException, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateBookingDto } from './dto/booking.dto'; 
import { BookingService } from './booking.service'; 
import { Booking } from './booking.entity'; 
import { JwtInterceptor } from 'src/auth_user/jwt.interceptor';
import { AuthGuard } from 'src/auth_user/auth.guard';
import { RoleGuard } from 'src/auth_user/role.guard';

@Controller('booking')
@UseGuards(new RoleGuard(['user','admin']))
  @UseGuards(AuthGuard)
  @UseInterceptors(JwtInterceptor)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async findAll(): Promise<Booking[]> {
    return this.bookingService.getBookings();
  }

  @Get(':bookingId')
  async getUserWithPhones(@Param('bookingId') bookingId: number): Promise<Booking> {
      try {
          const booking = await this.bookingService.getBookingWith(bookingId);
          return booking;
      } catch (error) {
          throw new NotFoundException('Booking not found');
      }
  }

  @Post()
  createBooking(@Body() createBooking: CreateBookingDto): Promise<Booking> {
    return this.bookingService.createBooking(createBooking);
  }
  @Patch(':bookingId')
  async updateBooking(@Param('bookingId') bookingId: number, @Body() updateBooking: Booking): Promise<Booking> {
    try {
      const updatedBooking = await this.bookingService.updateBooking(bookingId, updateBooking);
      return updatedBooking;
    } catch (error) {
      throw new NotFoundException('Booking not found');
    }
  }

  @Delete(':bookingId')
  async deleteBooking(@Param('bookingId') bookingId: number): Promise<void> {
    try {
      await this.bookingService.deleteBooking(bookingId);
    } catch (error) {
      throw new NotFoundException('Booking not found');
    }
  }
}