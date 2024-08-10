/* eslint-disable prettier/prettier */
import {  Body, Controller,  Delete,  Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateServiceDto } from './dto/service.dto';  
import { ServiceService } from './service.service'; 
import { Service } from './service.entity';
import { RoleGuard } from 'src/auth_user/role.guard';
import { AuthGuard } from 'src/auth_user/auth.guard';



@Controller('service')

export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async findAll(): Promise<Service[]> {
    return this.serviceService.getServices();
  }
//   @Get(':staffId')
//   async getUserWithPhones(@Param('staffId') staffId: number): Promise<Staff> {
//     try {
//       const user = await this.serviceService.getUserWithPhones(userId);
//       return user;
//     } catch (error) {
//       throw new NotFoundException('User not found');
//     }
//   }

  @Post()
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  createService(@Body() createService: CreateServiceDto): Promise<Service> {
    return this.serviceService.createService(createService);
  }
  @Patch(':serviceId')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  async updateService(@Param('serviceId') serviceId: number, @Body() updateService: Service): Promise<Service> {
    try {
      const updatedService = await this.serviceService.updateService(serviceId, updateService);
      return updatedService;
    } catch (error) {
      throw new NotFoundException('Service not found');
    }
  }

  @Delete(':serviceId')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  async deleteService(@Param('serviceId') serviceId: number): Promise<void> {
    try {
      await this.serviceService.deleteService(serviceId);
    } catch (error) {
      throw new NotFoundException('Service not found');
    }
  }
}