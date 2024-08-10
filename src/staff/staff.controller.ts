/* eslint-disable prettier/prettier */
import {  Body, Controller,  Delete,  Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateStaffDto } from './dto/staff.dto'; 
import { StaffService } from './staff.service'; 
import { Staff } from './staff.entity'; 
import { AuthGuard } from 'src/auth_user/auth.guard';
import { RoleGuard } from 'src/auth_user/role.guard';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // @Get()
  // @UseGuards(new RoleGuard(['user']))
  // @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<Staff[]> {
    return this.staffService.getStaffs();
  }
  @Get(':staffId')
  async getUserWithPhones(@Param('staffId') staffId: number): Promise<Staff> {
    try {
      const user = await this.staffService.getStaffWith(staffId);
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
  @Post()
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  createStaff(@Body() createStaff: CreateStaffDto): Promise<Staff> {
    return this.staffService.createStaff(createStaff);
  }
  @Patch(':staffId')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  async updateStaff(@Param('staffId') staffId: number, @Body() updateStaff: Staff): Promise<Staff> {
    try {
      const updatedUser = await this.staffService.updateStaff(staffId, updateStaff);
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('Staff not found');
    }
  }

  @Delete(':staffId')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  async deleteStaff(@Param('staffId') staffId: number): Promise<void> {
    try {
      await this.staffService.deleteStaff(staffId);
    } catch (error) {
      throw new NotFoundException('Staff not found');
    }
  }
}