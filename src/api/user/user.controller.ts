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
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<UserDocument[]> {
    return await this.userService.getAllUser();
  }
}
