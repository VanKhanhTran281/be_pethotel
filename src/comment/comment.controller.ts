/* eslint-disable prettier/prettier */
import {  Body, Controller,  Delete,  Get, NotFoundException, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateCommentDto } from './dto/comment.dto'; 
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { RoleGuard } from 'src/auth_user/role.guard';
import { AuthGuard } from 'src/auth_user/auth.guard';
import { JwtInterceptor } from 'src/auth_user/jwt.interceptor';

@Controller('comment')
@UseGuards(new RoleGuard(['user','admin']))
  @UseGuards(AuthGuard)
  @UseInterceptors(JwtInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}


  @Get()
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  async findAll(): Promise<Comment[]> {
    return this.commentService.getComments();
  }
  // @Get()
  // getComments(
  //   @Query('page') page: string,
  //   @Query('pageSize') pageSize: string,
  // ): Promise<{ comment: Comment[], totalPage: number, currentPage: number }> {
  //   const parsedPage = parseInt(page, 10);
  //   const parsedPageSize = parseInt(pageSize, 10);
  //   return this.commentService.getComments(parsedPage, parsedPageSize);
  // }
  // @Get(':userId')
  // async getUserWithPhones(@Param('userId') userId: number): Promise<User> {
  //   try {
  //     const user = await this.commentService.getUserWithPhones(userId);
  //     return user;
  //   } catch (error) {
  //     throw new NotFoundException('User not found');
  //   }
  // }
  @Post()
  
  createComment(@Body() createComment: CreateCommentDto): Promise<Comment> {
    return this.commentService.createComment(createComment);
  }
  @Patch(':commentId')
  async updateComment(@Param('commentId') commentId: number, @Body() updateComment: Comment): Promise<Comment> {
    try {
      const updatedComment = await this.commentService.updateComment(commentId, updateComment);
      return updatedComment;
    } catch (error) {
      throw new NotFoundException('Comment not found');
    }
  }

  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: number): Promise<void> {
    try {
      await this.commentService.deleteComment(commentId);
    } catch (error) {
      throw new NotFoundException('Comment not found');
    }
  }
}