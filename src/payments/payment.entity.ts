/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { DetailBooking } from 'src/detail_booking/detail.entity';
@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column({ type: 'timestamp' ,default: () => 'CURRENT_TIMESTAMP'})
  paymentDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  paymentAmount: number;

  @OneToOne(() => DetailBooking, (detailBooking) => detailBooking.payment)
  @JoinColumn({ name: 'detailId' })
  detailBooking: DetailBooking;
}
