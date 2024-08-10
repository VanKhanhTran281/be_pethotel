/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetailBooking } from 'src/detail_booking/detail.entity';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  staffId: number;

  @Column()
  staffName: string;

  @Column()
  sex: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => DetailBooking, (detailBooking) => detailBooking.staff)
  detailBooking: DetailBooking[];
}
