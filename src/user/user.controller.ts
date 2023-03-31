import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Put()
  createUser(@Body() data: CreateUserDto): Promise<boolean> {
    return this.userService.createUser(data);
  }
}
