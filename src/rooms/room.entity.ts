/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from 'src/booking/booking.entity';
import { Image } from 'src/images/image.entity';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn()
  roomId: number;

  @Column()
  roomNumber: string;

  @Column()
  roomType: string;
  @Column()
  size: string;

  @Column()
  describe: string;
  @Column()
  img: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'decimal' })
  discount: number;

  @Column()
  condition: string;

  @OneToMany(() => Booking, (booking) => booking.room)
  booking: Booking[];

  @OneToMany(() => Image, (image) => image.room)
  image: Image[];

}
