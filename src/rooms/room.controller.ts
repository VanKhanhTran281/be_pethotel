/* eslint-disable prettier/prettier */
import {  Body, Controller,  Delete,  Get, NotFoundException, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateRoomDto } from './dto/room.dto'; 
import { RoomService } from './room.service';
import { Room } from './room.entity'; 
import { RoleGuard } from 'src/auth_user/role.guard';
import { AuthGuard } from 'src/auth_user/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomService.getRooms();
  }
  // @Get()
  // getRooms(
  //   @Query('page') page: string,
  //   @Query('pageSize') pageSize: string,
  // ): Promise<{ room: Room[], totalPage: number, currentPage: number }> {
  //   const parsedPage = parseInt(page, 10);
  //   const parsedPageSize = parseInt(pageSize, 10);
  //   return this.roomService.getRooms(parsedPage, parsedPageSize);
  // }
  // @Get(':userId')
  // async getUserWithPhones(@Param('userId') userId: number): Promise<User> {
  //   try {
  //     const user = await this.userService.getUserWithPhones(userId);
  //     return user;
  //   } catch (error) {
  //     throw new NotFoundException('User not found');
  //   }
  // }







  @Post()
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads', // Thư mục lưu trữ tệp tin
        filename: (req, file, callback) => {
          // Đặt tên tệp tin theo cấu trúc mong muốn
          const uniqueSuffix = `${Date.now()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
    })
  )
  async createRoom(@UploadedFile() file: Express.Multer.File, @Body() createRoomDto: CreateRoomDto): Promise<Room> {
    createRoomDto.img = file.filename;
    // createRoomDto.imgUrl = path.join(file.originalname+'/'+ file.filename);
    return this.roomService.createRoom(createRoomDto);
  }
  // @Post()
  // @UseGuards(new RoleGuard(['admin']))
  // @UseGuards(AuthGuard)
  // createRoom(@Body() createRoom: CreateRoomDto): Promise<Room> {
  //   return this.roomService.createRoom(createRoom);
  // }
  @Patch(':roomId')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  async updateRoom(@Param('roomId') roomId: number, @Body() updateRoom: Room): Promise<Room> {
    try {
      const updatedRoom = await this.roomService.updateRoom(roomId, updateRoom);
      return updatedRoom;
    } catch (error) {
      throw new NotFoundException('Room not found');
    }
  }

  @Delete(':roomId')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  async deleteRoom(@Param('roomId') roomID: number): Promise<void> {
    try {
      await this.roomService.deleteRoom(roomID);
    } catch (error) {
      throw new NotFoundException('Room not found');
    }
  }
}