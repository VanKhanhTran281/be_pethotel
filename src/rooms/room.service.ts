/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/room.dto';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) { }

  getRooms(): Promise<Room[]> {
    return this.roomRepository.find();
  }
  // async getRooms(page: number, pageSize: number): Promise<{ room: Room[], totalPage: number, currentPage: number }> {
  //   const [room, total] = await this.roomRepository.findAndCount({
  //     skip: (page - 1) * pageSize,
  //     take: pageSize,
  //   });

  //   const totalPage = Math.ceil(total / pageSize);
  //   const currentPage = page;

  //   return { room, totalPage, currentPage };
  // }
  // async findOne(userId: number): Promise<User | undefined> {
  //   return await this.userRepository.findOne({
  //     where: { userId },
  //     relations: ['comment'],
  //   });
  // }
  
  // async getUserWithPhones(userId: number): Promise<User> {
  //   const user = await this.userRepository.findOne({
  //     where: { userId },
  //     relations: ['comment'],
  //   });
  
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  
  //   return user;
  // }
  async findOneId(roomId: number): Promise<Room | undefined> {
    return await this.roomRepository.findOne({
      where: { roomId },
      relations: [],
    });
  }
  createRoom(createRoom: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create(createRoom);
    return this.roomRepository.save(room);
  }
  async updateRoom(roomId: number, updateRoom: Room): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { roomId } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    Object.assign(room, updateRoom);
    await this.roomRepository.save(room);
    return room;
  }

  async deleteRoom(roomId: number): Promise<void> {
    const result = await this.roomRepository.delete(roomId);
    if (result.affected === 0) {
      throw new NotFoundException('Room not found');
    }
  }
}