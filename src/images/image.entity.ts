/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from 'src/rooms/room.entity';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn()
  imgId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
  @Column()
  imgUrl: string;

  @ManyToOne(() => Room, (room) => room.image)
  @JoinColumn({ name: 'roomId' })
  room: Room;
}
