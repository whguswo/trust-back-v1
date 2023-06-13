import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '../models';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUser(@Req() request: Request): Promise<User[]> {
    if (request.user.role !== 'ADMIN') throw new UnauthorizedException();
    return this.userService.getAllUser();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(
    @Req() request: Request,
    @Body() data: CreateUserDto,
  ): Promise<User | boolean> {
    if (request.user.role !== 'ADMIN') throw new UnauthorizedException();
    return this.userService.createUser(data);
  }
}
