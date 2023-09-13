import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto, ResponseDto } from 'src/common/dto';
import {
  User,
  UserDocument,
} from 'src/common/schemas';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getAllUser(): Promise<UserDocument[]> {
    const users = await this.userModel.find().lean();

    users.map(user => {
      delete user['password'];
    });

    return users;
  }

  async getUserByUsername(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username: username }).lean();
    if (!user) throw new HttpException('계정 또는 비밀번호가 잘못되었습니다.', 404)

    return user;
  }

  async createUser(data: CreateUserDto): Promise<ResponseDto> {
    const existingUser = await this.userModel.findOne({ username: data.username });
    if (existingUser) throw new HttpException('해당 사용자가 이미 존재합니다.', 404);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new this.userModel({
      username: data.username,
      password: hashedPassword,
      name: 'a',
      hashtag: [],
      type: 'web',
      role: 'USER',
    })

    await user.save();

    return { status: 200, message: '사용자가 등록되었습니다.' };
  }

}
