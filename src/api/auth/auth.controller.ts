import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { Request } from 'express';
import { User, UserDocument } from 'src/common/schemas';
import { LoginDto } from 'src/common/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: LoginDto): Promise<AccessTokenResponse> {
    const user = await this.authService.login(data);
    return await this.authService.getAccessToken(user);
  }
}
