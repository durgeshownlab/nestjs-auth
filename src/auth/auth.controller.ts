import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

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

}
