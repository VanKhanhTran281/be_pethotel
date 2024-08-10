/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './image.controller'; 
import { ImageService } from './image.service'; 
import { Image } from './image.entity'; 
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import { Room } from 'src/rooms/room.entity';
import { RoomService } from 'src/rooms/room.service';


@Module({
  imports: [TypeOrmModule.forFeature([Image,User,Room])],
  controllers: [ImageController],
  providers: [ImageService,UserService,RoomService],
  exports: [ImageService]
})
export class ImageModule {}