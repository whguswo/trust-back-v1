import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDocument } from 'src/common/schemas';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<UserDocument[]> {
    return await this.userService.getAllUser();
  }
}
