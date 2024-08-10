/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service'; 
import { Comment } from './comment.entity'; 
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';


@Module({
  imports: [TypeOrmModule.forFeature([Comment,User])],
  controllers: [CommentController],
  providers: [CommentService,UserService],
  exports: [CommentService]
})
export class CommentModule {}