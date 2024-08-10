/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
  // async getUsers(page: number, pageSize: number): Promise<{ user: User[], totalPage: number, currentPage: number }> {
  //   const [user, total] = await this.userRepository.findAndCount({
  //     skip: (page - 1) * pageSize,
  //     take: pageSize,
  //   });

  //   const totalPage = Math.ceil(total / pageSize);
  //   const currentPage = page;

  //   return { user, totalPage, currentPage };
  // }
  async findOnee(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {  email},
      relations: ['comment','booking'],
    });
  }
  async findOneId(userId: number): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { userId },
      relations: ['comment','booking'],
    });
  }
  // ,'booking.detail_booking'
  // async getUserWithIds(userId: number): Promise<User> {
  //   const user = await this.userRepository.findOne({
  //     where: { userId },
  //     relations: ['comment','booking'],
  //   });
  
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  
  //   return user;
  // }
  async getUserWithIds(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['comment', 'booking', 'booking.room',
      'booking.detailBooking','booking.detailBooking.service',
      'booking.detailBooking.staff',
      ],
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    return user;
  }


  async createUser(createUser: CreateUserDto): Promise<User> {
    const { email, password } = createUser;
  
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException(`Email "${email}" already exists`);
    }
  
    // Hash the password
    const hashedPassword = hashSync(password, 10);
  
    // Create the new user
    const user = this.userRepository.create({ ...createUser, password: hashedPassword });
    return this.userRepository.save(user);
  }

  // createUser(createUser: CreateUserDto): Promise<User> {
  //     const { password } = createUser;
  //     const hashedPassword = hashSync(password, 10);
  //     const user = this.userRepository.create({ ...createUser, password: hashedPassword });
  //     return this.userRepository.save(user);
  //   }
  // createUser(createUser: CreateUserDto): Promise<User> {
  //   const user = this.userRepository.create(createUser);
  //   return this.userRepository.save(user);
  // }
  async updateUser(userId: number, updateUser: User): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUser);
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(userId: number): Promise<void> {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}

