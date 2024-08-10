/* eslint-disable prettier/prettier */
import {  Body, Controller,  Delete,  Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateDetailDto } from './dto/detail.dto'; 
import { DetailBookingService } from './detail.service'; 
import { DetailBooking } from './detail.entity'; 
import { RoleGuard } from 'src/auth_user/role.guard';
import { AuthGuard } from 'src/auth_user/auth.guard';

@Controller('detail_booking')
@UseGuards(new RoleGuard(['user','admin']))
@UseGuards(AuthGuard)
export class DetailBookingController {
  constructor(private readonly detailService: DetailBookingService) {}

  @Get()
  async findAll(): Promise<DetailBooking[]> {
    return this.detailService.getDetails();
  }

  @Get(':detailId')
  async getDetailWithId(@Param('detailId') detailId: number): Promise<DetailBooking> {
    try {
      const detail = await this.detailService.getDetailWith(detailId);
      return detail;
    } catch (error) {
      throw new NotFoundException('Detail not found');
    }
  }

  @Post()
  createDetail(@Body() createDetail: CreateDetailDto): Promise<DetailBooking> {
    return this.detailService.createDetail(createDetail);
  }
  @Patch(':detailId')
  async updateDetail(@Param('detailId') bookingId: number, @Body() updateDetail: DetailBooking): Promise<DetailBooking> {
    try {
      const updatedDetail = await this.detailService.updateDetail(bookingId, updateDetail);
      return updatedDetail;
    } catch (error) {
      throw new NotFoundException('Detail not found');
    }
  }

  @Delete(':detailId')
  async deleteDetail(@Param('detailId') detailId: number): Promise<void> {
    try {
      await this.detailService.deleteDetail(detailId);
    } catch (error) {
      throw new NotFoundException('Detail not found');
    }
  }
}