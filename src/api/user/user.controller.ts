import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from 'src/common/schemas';
import { AdminGuard } from 'src/common/guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Admin User manage
  @Get()
  @UseGuards(AdminGuard)
  async getAllUser(): Promise<UserDocument[]> {
    return await this.userService.getAllUser();
  }

  // Main Member Page
  @Get('/member')
  async getAllMember(): Promise<UserDocument[]> {
    return await this.userService.getAllMember();
  }
}
