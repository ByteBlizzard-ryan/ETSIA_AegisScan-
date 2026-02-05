import {Controller, Post, Body} from '@nestjs/common';
import { LoginDto } from './loginDTo.dot';
import {AuthService} from './authService.service';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() logindot: LoginDto) {
    return this.authService.login(logindot);
  }
}
