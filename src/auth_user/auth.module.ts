/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module'; 
import { jwtConstants } from './constants';


@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,//Cho phép module JWT có thể được sử dụng ở bất kỳ nơi nào trong ứng dụng.
            secret: jwtConstants.secret,//Đây là secret key được sử dụng để mã hóa và giải mã JWT.
            signOptions: { expiresIn: '1h' }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports:[AuthService]
})
export class AuthModule { }