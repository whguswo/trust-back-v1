import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { loginDto } from 'src/user/dto/login.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // @UseGuards(LocalAuthGuard)
  async login(@Body() data: loginDto) {
    return this.authService.login(data);
  }
}
