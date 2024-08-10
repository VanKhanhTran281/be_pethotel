/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetailBooking } from 'src/detail_booking/detail.entity'; 

@Entity('service')
export class Service {
  @PrimaryGeneratedColumn()
  serviceId: number;

  @Column()
  nameService: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  describe: string;

  @OneToMany(() => DetailBooking, (detailBooking) => detailBooking.service)
  detailBooking: DetailBooking[];
}
