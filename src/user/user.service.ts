import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserDocument } from '../models';
import * as bcrypt from 'bcrypt';
import { PostService } from 'src/post/post.service';
import { AssignmentService } from 'src/assignment/assignment.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly postService: PostService,
    @Inject(forwardRef(() => AssignmentService))
    private readonly assignService: AssignmentService,
  ) {}

  async getAllUser(): Promise<User[]> {
    const result = await this.userModel.find().lean();
    return result;
  }

  async getUser(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).lean();
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).lean();
    return user ?? null;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(new Types.ObjectId(id));
    return user ?? null;
  }

  async createUser(data: CreateUserDto): Promise<User | boolean> {
    const existingUser = await this.userModel
      .findOne({ username: data.username })
      .lean();

    if (existingUser) throw new HttpException('Alreadt Exist.', 404);

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new this.userModel({
      _id: new mongoose.Types.ObjectId(),
      ...data,
      password: hashedPassword,
      role: 'USER',
      assignments: [],
    });

    try {
      await user.save();
      return user;
    } catch (err) {
      console.log('Error creating user:', err);
      return false;
    }
  }

  async getUserInfo(id: string): Promise<any> {
    const user = await this.userModel.findById(new Types.ObjectId(id));
    const posts = await this.postService.getPostByUserId(id);
    const assignments = await this.assignService.getAllAssignByUserId(id);

    return { user, posts, assignments };
  }
}
