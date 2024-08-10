/* eslint-disable prettier/prettier */
import {  Body, Controller,  Delete,  Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/payment.dto'; 
import { PaymentService } from './payment.service'; 
import { Payment } from './payment.entity'; 

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentService.getPayments();
  }
//   @Get(':staffId')
//   async getUserWithPhones(@Param('staffId') staffId: number): Promise<Staff> {
//     try {
//       const user = await this.bookingService.getUserWithPhones(userId);
//       return user;
//     } catch (error) {
//       throw new NotFoundException('User not found');
//     }
//   }
  @Post()
  createPayment(@Body() createPayment: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.createPayment(createPayment);
  }
  @Patch(':paymentId')
  async updatePayment(@Param('paymentId') paymentId: number, @Body() updatePayment: Payment): Promise<Payment> {
    try {
      const updatedPayment = await this.paymentService.updatePayment(paymentId, updatePayment);
      return updatedPayment;
    } catch (error) {
      throw new NotFoundException('Payment not found');
    }
  }

  @Delete(':paymentId')
  async deletePayment(@Param('paymentId') paymentId: number): Promise<void> {
    try {
      await this.paymentService.deletePayment(paymentId);
    } catch (error) {
      throw new NotFoundException('Payment not found');
    }
  }
}