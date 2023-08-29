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

  async createUser(data: CreateUserDto): Promise<ResponseDto> {
    const existingUser = await this.userModel.findOne({ username: data.username });
    if (existingUser) throw new HttpException('해당 사용자가 이미 존재합니다.', 404);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new this.userModel({
      username: data.username,
      password: hashedPassword,
      role: 'USER',
      assignments: [],
    })

    await user.save();

    return { status: 200, message: '사용자가 등록되었습니다.' };
  }

}
