import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService){}

  @UseGuards(AuthGuard)
  @Get("me")
  async myProfile(@Request() req) {    
    return await this.userService.getProfile(req.user.sub)
  }
}
