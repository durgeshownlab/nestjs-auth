import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  // private authService: AuthService
  // constructor(authService: AuthService){
  //   this.authService = authService
  // }
  constructor(private readonly authService: AuthService){}

  @Post('register')
  register(@Body() registerUserDto: RegisterDto) {
    const result = this.authService.register(registerUserDto);
    return result;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginDto) {
    const result = this.authService.login(loginUserDto);
    return result;
  }

}
