/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/staff.dto'; 
import { Staff } from './staff.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) { }

  getStaffs(): Promise<Staff[]> {
    return this.staffRepository.find();
  }
//   async findOne(userId: number): Promise<User | undefined> {
//     return await this.staffRepository.findOne({
//       where: { userId },
//       relations: ['comment'],
//     });
//   }
  
//   async getUserWithPhones(userId: number): Promise<User> {
//     const user = await this.staffRepository.findOne({
//       where: { userId },
//       relations: ['comment'],
//     });
  
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
  
//     return user;
//   }
async findOneId(staffId: number): Promise<Staff | undefined> {
  return await this.staffRepository.findOne({
    where: { staffId },
    relations: [],
  });
}

async getStaffWith(staffId: number): Promise<Staff> {
  const booking = await this.staffRepository.findOne(
    {
      where: { staffId },
      relations: ['detailBooking','detailBooking.service'],
    }
  );
  if (!booking) {
    throw new NotFoundException('Booking not found');
  }
  return booking;
}

createStaff(createStaff: CreateStaffDto): Promise<Staff> {
    const staff = this.staffRepository.create(createStaff);
    return this.staffRepository.save(staff);
  }
  async updateStaff(staffId: number, updateStaff: Staff): Promise<Staff> {
    const staff = await this.staffRepository.findOne({ where: { staffId } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    Object.assign(staff, updateStaff);
    await this.staffRepository.save(staff);
    return staff;
  }

  async deleteStaff(staffId: number): Promise<void> {
    const result = await this.staffRepository.delete(staffId);
    if (result.affected === 0) {
      throw new NotFoundException('Staff not found');
    }
  }
}