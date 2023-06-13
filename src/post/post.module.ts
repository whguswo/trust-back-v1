import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/models/post.schema';
import { UserModule } from 'src/user/user.module';
import PostController from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
