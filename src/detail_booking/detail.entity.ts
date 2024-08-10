/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToOne, JoinColumn } from 'typeorm';
import { Booking } from 'src/booking/booking.entity';
// import { Room } from 'src/rooms/room.entity'; 
import { Staff } from 'src/staff/staff.entity';
import { Service } from 'src/services/service.entity';
import { Payment } from 'src/payments/payment.entity'; 

@Entity('detail_booking')
export class DetailBooking {
  @PrimaryGeneratedColumn()
  detailId: number;

  @Column()
  roomNumber: string;

  @Column()
  roomType: string;

  @Column()
  totalPrice: number;

  @Column({ type: 'timestamp',default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  endDate: Date;

  @OneToOne(() => Booking, (booking) => booking.detailBooking)
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;
  @ManyToOne(() => Staff, (staff) => staff.detailBooking)
  @JoinColumn({ name: 'staffId' })
  staff: Staff;

  @ManyToOne(() => Service, (service) => service.detailBooking)
  @JoinColumn({ name: 'serviceId' })
  service: Service;

  @OneToOne(() => Payment, (payment) => payment.detailBooking)
  payment: Payment;
}