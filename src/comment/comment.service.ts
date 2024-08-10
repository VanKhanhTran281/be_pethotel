/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/comment.dto';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/users/user.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,private userService:UserService
  ) { }

  getComments(): Promise<Comment[]> {
    return this.commentRepository.find();
  }
  // async getComments(page: number, pageSize: number): Promise<{ comment: Comment[], totalPage: number, currentPage: number }> {
  //   const [comment, total] = await this.commentRepository.findAndCount({
  //     skip: (page - 1) * pageSize,
  //     take: pageSize,
  //   });

  //   const totalPage = Math.ceil(total / pageSize);
  //   const currentPage = page;

  //   return { comment, totalPage, currentPage };
  // }
  // async findOne(userId: number): Promise<User | undefined> {
  //   return await this.commentRepository.findOne({
  //     where: { userId },
  //     relations: ['comment'],
  //   });
  // }
  
  // async getUserWithPhones(userId: number): Promise<User> {
  //   const user = await this.commentRepository.findOne({
  //     where: { userId },
  //     relations: ['comment'],
  //   });
  
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  
  //   return user;
  // }
  
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { content, userId } = createCommentDto;
  
    // Check if the user exists
    const user = await this.userService.findOneId(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    const newComment = this.commentRepository.create({
      content,
      user,
    });
  
    return this.commentRepository.save(newComment);
  }
  // createComment(createComment: CreateCommentDto): Promise<Comment> {
  //   const comment = this.commentRepository.create(createComment);
  //   return this.commentRepository.save(comment);
  // }
  async updateComment(commentId: number, updateComment: Comment): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { commentId } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    Object.assign(comment, updateComment);
    await this.commentRepository.save(comment);
    return comment;
  }

  async deleteComment(commentId: number): Promise<void> {
    const result = await this.commentRepository.delete(commentId);
    if (result.affected === 0) {
      throw new NotFoundException('Comment not found');
    }
  }
}