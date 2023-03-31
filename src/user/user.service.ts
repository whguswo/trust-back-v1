import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUser(): Promise<User[]> {
    try {
      const result = await this.userModel.find({});
      return result;
    } catch (err) {
      console.log('error...');
    }
  }

  async getUser(username: string, password: string): Promise<User | string> {
    try {
      const result = await this.userModel
        .findOne({ username, password })
        .lean();
      if (!result) {
        return "User doesn't exist";
      }
      return result;
    } catch (err) {
      console.log('error...');
    }
  }

  async getUserByUsername(username: string): Promise<User | boolean> {
    try {
      const result = await this.userModel.findOne({ username }).lean();
      if (!result) {
        return false;
      }
      return result;
    } catch (err) {
      return false;
    }
  }

  async createUser(data: CreateUserDto): Promise<boolean> {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      console.log(data.password);
      await this.userModel.insertMany(data);
      return true;
    } catch (err) {
      console.log('error...');
      return false;
    }
  }
}
