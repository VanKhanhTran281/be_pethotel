/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/image.dto'; 
import { Image } from './image.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { RoomService } from 'src/rooms/room.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private roomService:RoomService
  ) { }

  getImages(): Promise<Image[]> {
    return this.imageRepository.find();
  }
  // async getImages(page: number, pageSize: number): Promise<{ image: Image[], totalPage: number, currentPage: number }> {
  //   const [image, total] = await this.imageRepository.findAndCount({
  //     skip: (page - 1) * pageSize,
  //     take: pageSize,
  //   });

  //   const totalPage = Math.ceil(total / pageSize);
  //   const currentPage = page;

  //   return { image, totalPage, currentPage };
  // }

  
  // async getImagesByRoomAndDate(roomId: number, date?: Date): Promise<Image[]> {
  //   const query = this.imageRepository.createQueryBuilder('image')
  //     .leftJoinAndSelect('image.room', 'room')
  //     .where('image.roomId = :roomId', { roomId });

  //   if (date) {
  //     query.andWhere('DATE(image.date) = DATE(:date)', { date: date.toISOString().slice(0, 10) });
  //   }

  //   return query.getMany();
  // }
  async getImagesByRoomAndDate(roomId: number): Promise<Image[]> {
    const query = this.imageRepository.createQueryBuilder('image')
      .leftJoinAndSelect('image.room', 'room')
      .where('image.roomId = :roomId', { roomId });

    return query.getMany();
  }


  // async createImage(createImageDto: CreateImageDto): Promise<Image> {
  //   const { roomId, imgUrl,date } = createImageDto;

  //   // Tìm kiếm Room tương ứng với roomId
  //   const room = await this.roomService.findOneId(roomId);
  //   if (!room) {
  //     throw new NotFoundException(`Room with ID ${roomId} not found`);
  //   }

  //   // Tạo Image mới và liên kết với Room
  //   const image = this.imageRepository.create({
  //     date,
  //     imgUrl,
  //     room,
  //   });

  //   return this.imageRepository.save(image);
  // }
  async createImage(createImageDto: CreateImageDto): Promise<Image> {
    const { roomId, imgUrl,date } = createImageDto;
  
    // Tìm kiếm Room tương ứng với roomId
    const room = await this.roomService.findOneId(roomId);
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }
  
    // Tạo Image mới và liên kết với Room
    const image = this.imageRepository.create({
      date,
      imgUrl,
      room,
    });
    console.log(image)
    return this.imageRepository.save(image);
  }
  async updateImage(imgId: number, updateImage: Image): Promise<Image> {
    const image = await this.imageRepository.findOne({ where: { imgId } });
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    Object.assign(image, updateImage);
    await this.imageRepository.save(image);
    return image;
  }

  async deleteImage(imgId: number): Promise<void> {
    const result = await this.imageRepository.delete(imgId);
    if (result.affected === 0) {
      throw new NotFoundException('Image not found');
    }
  }
}