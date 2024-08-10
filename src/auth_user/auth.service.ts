/* eslint-disable prettier/prettier */
import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service'; 
import { SignInDto } from './dto/sign_in.dto'; 
import { compareSync } from 'bcrypt';

@Injectable()
//Tạo ra payload cho JWT khi đăng nhập sẽ trả về 1 access_token, xác thực người dùng
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  // async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
  //   const { userName , password } = signInDto;
  //   const user = await this.userService.findOne(userName);
  //   if (!user || user.password !== password) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //   // Tạo payload cho JWT
  //   const payload = {id: user.userId, username: user.userName };
  //   // Tạo JWT
  //   const access_token = this.jwtService.sign(payload);
  //   return { access_token };
  // }
  //Phan ma hoa mat khau khi tao moi
    async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
      const { email, password } = signInDto;
      const user = await this.userService.findOnee(email);
      if (!user || !compareSync(password, user.password)) {
        throw new UnauthorizedException('Invalid credentials');
      }
      // Tạo payload cho JWT
      const payload = {id:user.userId, email:user.email,username: user.userName, sub: user.userId,role:user.role };
      // Tạo JWT
      const access_token = this.jwtService.sign(payload);
      return { access_token };
    }

  getCurrentUser(@Request() req){
    console.log(req.token)
  }

}

