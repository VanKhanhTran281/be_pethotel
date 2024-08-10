/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';


@Module({
  imports: [TypeOrmModule.forFeature([Room,User])],
  controllers: [RoomController],
  providers: [RoomService,UserService],
  exports: [RoomService]
})
export class RoomModule {}