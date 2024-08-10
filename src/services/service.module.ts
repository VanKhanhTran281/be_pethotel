/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './service.controller'; 
import { ServiceService } from './service.service'; 
import { Service } from './service.entity'; 
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
@Module({
  imports: [TypeOrmModule.forFeature([Service,User])],
  controllers: [ServiceController],
  providers: [ServiceService,UserService],
  exports: [ServiceService]
})
export class ServiceModule {}