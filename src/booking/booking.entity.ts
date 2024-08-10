/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity'; 
import { DetailBooking } from 'src/detail_booking/detail.entity'; 
import { Room } from 'src/rooms/room.entity';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @Column({ type: 'timestamp',default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  endDate: Date;

  @ManyToOne(() => User, (user) => user.booking)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => DetailBooking, (detailBooking) => detailBooking.booking)
  detailBooking: DetailBooking[];

  @ManyToOne(() => Room, (room) => room.booking)
  @JoinColumn({ name: 'roomId' })
  room: Room;
}
