import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models';
import { Post, PostDocument } from 'src/models/post.schema';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
    private readonly userService: UserService,
  ) {}

  async getPostById(_id: string): Promise<Post> {
    const post = await this.postModel.findById(_id);
    if (!post) throw new HttpException('No Post', 404);

    return post;
  }

  async createPost(data: CreatePostDto, user: User): Promise<Post> {
    const post = new this.postModel({
      ...data,
      user: user._id,
    });

    await post.save();
    return post;
  }

  async removePost(_id: string, user: User): Promise<boolean> {
    const post = await this.postModel.findById(_id);
    if (!post) throw new HttpException('No Post', 404);
    if (post.user.toString() !== user._id.toString() && user.role !== 'ADMIN')
      throw new HttpException('Permission denied', 404);

    const result = await this.postModel.deleteOne({ _id });

    return result.deletedCount > 0;
  }

  async modifyPost(
    data: CreatePostDto,
    _id: string,
    user: User,
  ): Promise<Post> {
    const post = await this.postModel.findById(_id);
    if (!post) throw new HttpException('No Post', 404);
    if (post.user.toString() !== user._id.toString() && user.role !== 'ADMIN')
      throw new HttpException('Permission denied', 404);

    post.title = data.title;
    post.content = data.content;
    post.category = data.category;
    post.save();

    return post;
  }
}
