import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>){}
  
  async createUser(registerUserDto: RegisterDto) {
    console.log("createUser", process.env.MONGODB_URI as string)
    return await this.userModel.create({
      fname: registerUserDto.fname,
      lname: registerUserDto.lname,
      email: registerUserDto.email,
      password: registerUserDto.password,
    })
  }

}
