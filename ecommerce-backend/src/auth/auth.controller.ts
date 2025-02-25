import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get('check')
  checking(){
    return 'It is Working';
  }
 
  @Post('register')
  async register(@Body() body) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    return this.usersService.create({ ...body, password: hashedPassword });
  }
 
  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body);

  }
}
