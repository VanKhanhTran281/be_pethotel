/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/service.dto'; 
import { Service } from './service.entity';  
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) { }

  getServices(): Promise<Service[]> {
    return this.serviceRepository.find();
  }
  // async getServices(page: number, pageSize: number): Promise<{ service: Service[], totalPage: number, currentPage: number }> {
  //   const [service, total] = await this.serviceRepository.findAndCount({
  //     skip: (page - 1) * pageSize,
  //     take: pageSize,
  //   });

  //   const totalPage = Math.ceil(total / pageSize);
  //   const currentPage = page;

  //   return { service, totalPage, currentPage };
  // }
//   async findOne(userId: number): Promise<User | undefined> {
//     return await this.serviceRepository.findOne({
//       where: { userId },
//       relations: ['comment'],
//     });
//   }
  
//   async getUserWithPhones(userId: number): Promise<User> {
//     const user = await this.serviceRepository.findOne({
//       where: { userId },
//       relations: ['comment'],
//     });
  
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
  
//     return user;
//   }
async findOneId(serviceId: number): Promise<Service | undefined> {
  return await this.serviceRepository.findOne({
    where: { serviceId },
    relations: [],
  });
}
createService(createService: CreateServiceDto): Promise<Service> {
    const service = this.serviceRepository.create(createService);
    return this.serviceRepository.save(service);
  }
  async updateService(serviceId: number, updateService: Service): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { serviceId } });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    Object.assign(service, updateService);
    await this.serviceRepository.save(service);
    return service;
  }

  async deleteService(serviceId: number): Promise<void> {
    const result = await this.serviceRepository.delete(serviceId);
    if (result.affected === 0) {
      throw new NotFoundException('Service not found');
    }
  }
}