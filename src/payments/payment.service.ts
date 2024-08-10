/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/payment.dto'; 
import { Payment } from './payment.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) { }

  getPayments(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }
  
//   async findOne(userId: number): Promise<User | undefined> {
//     return await this.paymentRepository.findOne({
//       where: { userId },
//       relations: ['comment'],
//     });
//   }
  
//   async getUserWithPhones(userId: number): Promise<User> {
//     const user = await this.paymentRepository.findOne({
//       where: { userId },
//       relations: ['comment'],
//     });
  
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
  
//     return user;
//   }
createPayment(createPayment: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPayment);
    return this.paymentRepository.save(payment);
  }
  async updatePayment(paymentId: number, updatePayment: Payment): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { paymentId } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    Object.assign(payment, updatePayment);
    await this.paymentRepository.save(payment);
    return payment;
  }

  async deletePayment(paymentId: number): Promise<void> {
    const result = await this.paymentRepository.delete(paymentId);
    if (result.affected === 0) {
      throw new NotFoundException('Payment not found');
    }
  }
}