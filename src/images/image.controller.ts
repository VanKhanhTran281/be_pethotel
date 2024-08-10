/* eslint-disable prettier/prettier */
import {  Body, Controller,  Delete,  Get, NotFoundException, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateImageDto } from './dto/image.dto'; 
import { ImageService } from './image.service'; 
import { Image } from './image.entity'; 
import { RoleGuard } from 'src/auth_user/role.guard';
import { AuthGuard } from 'src/auth_user/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import  { extname } from 'path';

@Controller('image')
@UseGuards(new RoleGuard(['user','admin']))
  @UseGuards(AuthGuard)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  
  @Get()
  async findAll(): Promise<Image[]> {
    return this.imageService.getImages();
  }
//   @Get(':staffId')
//   async getUserWithPhones(@Param('staffId') staffId: number): Promise<Staff> {
//     try {
//       const user = await this.bookingService.getUserWithPhones(userId);
//       return user;
//     } catch (error) {
//       throw new NotFoundException('User not found');
//     }
//   }
// @Get(':roomId')
//   async getImagesByRoomAndDate(
//     @Param('roomId') roomId: number,
//     @Query('date') date?: Date,
//   ): Promise<Image[]> {
//     return this.imageService.getImagesByRoomAndDate(roomId, date);
//   }

  @Get(':roomId')
  async getImagesByRoomAndDate(
    @Param('roomId') roomId: number,
  ): Promise<Image[]> {
    return this.imageService.getImagesByRoomAndDate(roomId);
  }



  @Post()
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('imgUrl', {
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
  async createImage(@UploadedFile() file: Express.Multer.File, @Body() createImageDto: CreateImageDto): Promise<Image> {
    createImageDto.imgUrl = file.filename;
    // createImageDto.imgUrl = path.join(file.originalname+'/'+ file.filename);
    return this.imageService.createImage(createImageDto);
  }

  // @Post()
  // createImage(@Body() createImage: CreateImageDto): Promise<Image> {
  //   return this.imageService.createImage(createImage);
  // }
  @Patch(':imgId')
  async updateImage(@Param('imgId') imgId: number, @Body() updateImage: Image): Promise<Image> {
    try {
      const updatedImage = await this.imageService.updateImage(imgId, updateImage);
      return updatedImage;
    } catch (error) {
      throw new NotFoundException('Image not found');
    }
  }

  @Delete(':imgId')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  async deleteImage(@Param('imgId') imgId: number): Promise<void> {
    try {
      await this.imageService.deleteImage(imgId);
    } catch (error) {
      throw new NotFoundException('Image not found');
    }
  }
}