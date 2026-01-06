import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService){}

  async register(registerUserDto: RegisterDto) {

    const hash = await bcrypt.hash(registerUserDto.password, 10, )

    console.log("registerDto", registerUserDto)
    // return {message: "User registered successfully"}
    const user = await this.userService.createUser({...registerUserDto, password: hash})

    return user
  }
}
