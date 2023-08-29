import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { User, UserDocument } from 'src/common/schemas';
import { CreateUserDto, ResponseDto } from 'src/common/dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<UserDocument[]> {
    return await this.userService.getAllUser();
  }

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<ResponseDto> {
    return await this.userService.createUser(data);
  }
}
