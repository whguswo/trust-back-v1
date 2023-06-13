import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express';
import { loginDto } from 'src/user/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Body() data: loginDto, @Req() request: Request) {
    const user = request.user;
    return this.authService.login(user);
  }
}
