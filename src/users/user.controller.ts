/* eslint-disable prettier/prettier */
import {  Body, Controller,  Delete,  Get, NotFoundException, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth_user/auth.guard';
import { RoleGuard } from 'src/auth_user/role.guard';
import { AuthService } from 'src/auth_user/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private authService:AuthService) {}

  @Get()
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.getUsers();
  }
  // getUsers(
  //   @Query('page') page: string,
  //   @Query('pageSize') pageSize: string,
  // ): Promise<{ user: User[], totalPage: number, currentPage: number }> {
  //   const parsedPage = parseInt(page, 10);
  //   const parsedPageSize = parseInt(pageSize, 10);
  //   return this.userService.getUsers(parsedPage, parsedPageSize);
  // }

  @Get('/current-user')
  @UseGuards(AuthGuard)
  getCurrentUser(@Request() req){
    return this.authService.getCurrentUser(req)
  }
  // @Get()
  // async findAll(): Promise<User[]> {
  //   return this.userService.getUsers();
  // }
  @Get(':userId')
  @UseGuards(AuthGuard)
  async getUserWithIds(@Param('userId') userId: number): Promise<User> {
    try {
      const user = await this.userService.getUserWithIds(userId);
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
  @Post()
  createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUser);
  }
  @Patch(':userId')
  async updateUser(@Param('userId') userId: number, @Body() updateUser: User): Promise<User> {
    try {
      const updatedUser = await this.userService.updateUser(userId, updateUser);
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userID: number): Promise<void> {
    try {
      await this.userService.deleteUser(userID);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}