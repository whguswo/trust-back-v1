import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto, CreateUserDto, ResponseDto } from 'src/common/dto';
import { UserDocument } from 'src/common/schemas';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AccessTokenResponse } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,

    private readonly jwtService: JwtService,
  ) {}

  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password + process.env.HASH_SALT, hashedPassword);
  }

  async login(data: LoginDto): Promise<UserDocument> {
    const user = await this.userService.getUserByUsername(data.username);
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword)
      throw new HttpException('계정 또는 비밀번호가 잘못되었습니다.', 404);

    return user;
  }

  async register(data: CreateUserDto): Promise<ResponseDto> {
    return await this.userService.createUser(data);
  }

  async getAccessToken(user: UserDocument): Promise<AccessTokenResponse> {
    delete user['password'];

    const payload = { ...user };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
