import { forwardRef, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePostDto } from 'src/common/dto';
import {
  Post,
  PostDocument,
  User,
  UserDocument,
} from 'src/common/schemas';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) {}

  async getPostById(_id: string): Promise<PostDocument> {
    const post = await this.postModel.findById(new Types.ObjectId(_id));
    if (!post) throw new HttpException('No Post', 404);

    return post;
  }

  async getMyPost(user: UserDocument): Promise<PostDocument[]> {
    const posts = await this.postModel.find({ user: user._id });

    return posts;
  }

  async getPostByUserId(_id: string): Promise<PostDocument[]> {
    const posts = await this.postModel.find({ user: new Types.ObjectId(_id) });

    return posts;
  }

  async createPost(data: CreatePostDto, user: UserDocument): Promise<PostDocument> {
    const post = new this.postModel({
      ...data,
      user: new Types.ObjectId(user._id),
    });

    await post.save();
    return post;
  }

  async removePost(_id: string): Promise<boolean> {
    const result = await this.postModel.deleteOne({ _id });

    return result.deletedCount > 0;
  }

  async managePost(
    data: CreatePostDto,
    post: PostDocument,
  ): Promise<PostDocument> {
    post.title = data.title;
    post.content = data.content;
    post.category = data.category;
    post.save();

    return post;
  }

}
