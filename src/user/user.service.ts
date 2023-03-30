import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

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

  async addUser(data: any): Promise<boolean> {
    try {
      await this.userModel.insertMany(data);
      return true;
    } catch (err) {
      console.log('error...');
      return false;
    }
  }
}
