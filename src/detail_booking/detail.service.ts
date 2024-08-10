/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetailDto } from './dto/detail.dto';
import { DetailBooking } from './detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingService } from 'src/booking/booking.service';
import { StaffService } from 'src/staff/staff.service';
import { ServiceService } from 'src/services/service.service';

@Injectable()
export class DetailBookingService {
  constructor(
    @InjectRepository(DetailBooking)
    private readonly detailRepository: Repository<DetailBooking>,
    private bookingService: BookingService,
    private staffService: StaffService,
    private serviceService: ServiceService,
  ) { }

  getDetails(): Promise<DetailBooking[]> {
    return this.detailRepository.find();
  }
  // async getDetails(page: number, pageSize: number): Promise<{ detail: DetailBooking[], totalPage: number, currentPage: number }> {
  //   const [detail, total] = await this.detailRepository.findAndCount({
  //     skip: (page - 1) * pageSize,
  //     take: pageSize,
  //   });

  //   const totalPage = Math.ceil(total / pageSize);
  //   const currentPage = page;

  //   return { detail, totalPage, currentPage };
  // }
  // async findOne(userId: number): Promise<User | undefined> {
  //   return await this.detailRepository.findOne({
  //     where: { userId },
  //     relations: ['comment'],
  //   });
  // }


  async getDetailWith(detailId: number): Promise<DetailBooking> {
    const detail = await this.detailRepository.findOne(
      {
        where: { detailId },
        relations: ['staff', 'service','booking.user'],
      }
    );
    if (!detail) {
      throw new NotFoundException('Detail not found');
    }
    return detail;
  }


  // Đang test
  async createDetail(createDetailDto: CreateDetailDto): Promise<DetailBooking> {
    const { bookingId, serviceId, roomNumber, startDate, endDate } = createDetailDto;

    // Check if the user exists
    const booking = await this.bookingService.findOneId(bookingId);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${bookingId} not found`);
    }

    // Check if the staff exists
    // const staff = await this.staffService.findOneId(staffId);
    // if (!staff) {
    //   throw new NotFoundException(`staff with ID ${staffId} not found`);
    // }

    // Check if the service exists
    const service = await this.serviceService.findOneId(serviceId);
    if (!service) {
      throw new NotFoundException(`service with ID ${serviceId} not found`);
    }

    // Check if the room is already booked for the given date range

    const existingDetailsCount = await this.detailRepository.createQueryBuilder('detail_booking')
      .where('detail_booking.roomNumber = :roomNumber', { roomNumber })
      .andWhere(
        'detail_booking.startDate <= :endDate AND detail_booking.endDate >= :startDate'
        , { startDate, endDate })
      .getCount();

    if (existingDetailsCount > 0) {
      throw new BadRequestException(`Room ${roomNumber} is already booked for the given date range.`);
    }



    // const existingDetailsCount = await this.detailRepository.createQueryBuilder('detail_booking')
    //   .where('detail_booking.roomNumber = :roomNumber', { roomNumber })
    //   .andWhere(
    //     '(:startDate BETWEEN detail_booking.startDate AND detail_booking.endDate)' +
    //     'OR (:endDate BETWEEN detail_booking.startDate AND detail_booking.endDate)' +
    //     'OR (detail_booking.startDate BETWEEN :startDate AND :endDate)' +
    //     'OR (detail_booking.endDate BETWEEN :startDate AND :endDate)'
    //     , { startDate, endDate })
    //   .orWhere('detail_booking.startDate = :startDate AND detail_booking.endDate = :endDate', { startDate, endDate })
    //   .getCount();

    // if (existingDetailsCount > 0) {
    //   throw new BadRequestException(`Room ${roomNumber} is already booked for the given date range.`);
    // }

    // const existingDetails = await this.detailRepository.find({
    //   where: {
    //     roomNumber,
    //     startDate: Between(startDate, endDate),
    //     endDate: Between(startDate, endDate)
    //   }
    // });

    // if (existingDetails.length > 0) {
    //   throw new BadRequestException(`Room ${roomNumber} is already booked for the given date range.`);
    // }

    const newDetail = this.detailRepository.create({
      booking,
      // staff: staff||null,
      service,
      ...createDetailDto
    });

    return this.detailRepository.save(newDetail);
  }


  // async createDetail(createDetailDto: CreateDetailDto): Promise<DetailBooking> {
  //   const { bookingId, staffId, serviceId } = createDetailDto;

  //   // Check if the user exists
  //   const booking = await this.bookingService.findOneId(bookingId);
  //   if (!booking) {
  //     throw new NotFoundException(`Booking with ID ${bookingId} not found`);
  //   }

  //   // Check if the room exists
  //   const staff = await this.staffService.findOneId(staffId);
  //   if (!staff) {
  //     throw new NotFoundException(`staff with ID ${staffId} not found`);
  //   }
  //   const service = await this.serviceService.findOneId(serviceId);
  //   if (!service) {
  //     throw new NotFoundException(`service with ID ${serviceId} not found`);
  //   }

  //   const newDetail = this.detailRepository.create({
  //     booking,
  //     staff,
  //     service,
  //     ...createDetailDto
  //   });

  //   return this.detailRepository.save(newDetail);
  // }


  // createDetail(createDetail: CreateDetailDto): Promise<DetailBooking> {
  //     const detail = this.detailRepository.create(createDetail);
  //     return this.detailRepository.save(detail);
  //   }


  async updateDetail(detailId: number, updateDetail: DetailBooking): Promise<DetailBooking> {
    const detail = await this.detailRepository.findOne({ where: { detailId } });
    if (!detail) {
      throw new NotFoundException('Detail not found');
    }
    Object.assign(detail, updateDetail);
    await this.detailRepository.save(detail);
    return detail;
  }

  async deleteDetail(detailId: number): Promise<void> {
    const result = await this.detailRepository.delete(detailId);
    if (result.affected === 0) {
      throw new NotFoundException('Detail not found');
    }
  }
}