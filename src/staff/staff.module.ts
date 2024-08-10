/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffController } from './staff.controller'; 
import { StaffService } from './staff.service'; 
import { Staff } from './staff.entity'; 

import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';



@Module({
  imports: [TypeOrmModule.forFeature([Staff,User])],
  controllers: [StaffController],
  providers: [StaffService,UserService],
  exports: [StaffService]
})
export class StaffModule {}