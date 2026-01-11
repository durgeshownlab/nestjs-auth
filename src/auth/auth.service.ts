import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUser.dto';
import { emitWarning } from 'process';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ){}

  async register(registerUserDto: RegisterDto) {

    const hash = await bcrypt.hash(registerUserDto.password, 10, )

    console.log("registerDto", registerUserDto)
    // return {message: "User registered successfully"}
    const createdUser = await this.userService.createUser({...registerUserDto, password: hash})
    const payload = {
      sub: createdUser._id,
      fname: createdUser.fname,
      lname: createdUser.lname,
      email: createdUser.email,
      role: createdUser.role
    }

    const jwtToken = await this.jwtService.signAsync(payload)


    console.log('createdUser', createdUser)
    console.log('jwtToken', jwtToken)

    return {user: createdUser, jwtToken}
  }

  async login(loginDto: LoginDto) {
    try {
      console.log("LoginDto: ", loginDto)
      const user = await this.userService.findUserByEmailWithPassword(loginDto.email);
      
      if(!user) {
        throw new NotFoundException("user does not exist")
      }

      const isPasswordCorrect = await bcrypt.compare(loginDto.password, user?.password)
      console.log("isPasswordCorrect", isPasswordCorrect)
      if(!isPasswordCorrect) {
        throw new UnauthorizedException("password is incorrect")
      }

      const payload = {
        sub: user?._id,
        fname: user?.fname,
        lname: user?.lname,
        email: user?.email,
      }
  
      const token = await this.jwtService.signAsync(payload)
  
      return {...user, token};
    }
    catch(error: any) {
      throw error
    }
  }
}
