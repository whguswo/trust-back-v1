import { forwardRef, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/common/dto';
import {
  User,
  UserDocument,
} from 'src/common/schemas';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    private readonly jwtService: JwtService,
  ) {}

  private async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password + process.env.HASH_SALT, hashedPassword);
  }

  async login(data: LoginDto): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username: data.username }).lean();
    if (!user) throw new HttpException('계정 또는 비밀번호가 잘못되었습니다.', 404);

    return user;
  }

  async getAccessToken(user: UserDocument): Promise<AccessTokenResponse> {
    delete user['password'];

    const payload = { ...user };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

}
