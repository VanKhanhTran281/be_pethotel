/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity'; 

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn({ name: 'userId' })
  user: User;
}