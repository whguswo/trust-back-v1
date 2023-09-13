import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { Request } from 'express';
import { User, UserDocument } from 'src/common/schemas';
import { CreateUserDto, LoginDto, ResponseDto } from 'src/common/dto';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login API', description: '사용자 로그인' })
  async login(@Body() data: LoginDto): Promise<AccessTokenResponse> {
    const user = await this.authService.login(data);
    return await this.authService.getAccessToken(user);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register API', description: '사용자를 생성' })
  async register(@Body() data: CreateUserDto): Promise<ResponseDto> {
    return await this.authService.register(data);
  }
}
