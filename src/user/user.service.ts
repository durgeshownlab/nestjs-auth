import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>){}
  
  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      })
    }
    catch(error: any) {
      const e = error as {code?: number}
      const DUPLICATE_KEY_CODE = 11000;
      if(e.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException("Email is already exist!")
      } else {
        throw error;
      }
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.userModel.findOne({email}).select("-password -__v");
    }
    catch(error: any) {
      throw error
    }
  }

  async findUserByEmailWithPassword(email: string) {
    try {
      return await this.userModel.findOne({email}).select("-__v").lean();
    }
    catch(error: any) {
      throw error
    }
  }

  async getProfile(userId: string) {
    return await this.userModel.findById(userId).select("-password -__v").lean() ?? {};
  }
}
