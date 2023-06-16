import {
  Body,
  Controller,
  Get,
  Param,
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
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('userToken')
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUser(@Req() request: Request): Promise<User[]> {
    if (request.user.role !== 'ADMIN') throw new UnauthorizedException();
    return this.userService.getAllUser();
  }

  @ApiBearerAuth('userToken')
  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(
    @Req() request: Request,
    @Body() data: CreateUserDto,
  ): Promise<User | boolean> {
    if (request.user.role !== 'ADMIN') throw new UnauthorizedException();
    return this.userService.createUser(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/id/:id')
  getUserTest(@Param('id') id: string): Promise<any> {
    return this.userService.getUserById(id);
  }

  @ApiBearerAuth('userToken')
  @UseGuards(JwtAuthGuard)
  @Post('/id/:id')
  getUserInfo(@Req() request: Request, @Param('id') id: string): Promise<any> {
    if (request.user.role !== 'ADMIN' && request.user._id.toString() !== id)
      throw new UnauthorizedException();

    return this.userService.getUserInfo(id);
  }
}
