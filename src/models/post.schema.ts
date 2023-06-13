import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type PostDocument = Post & Document;

const options: SchemaOptions = {
  timestamps: false,
  versionKey: false,
};

enum PostCategory {
  WEB = 'web',
  PWN = 'pwn',
  REV = 'rev',
}

@Schema(options)
export class Post {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  user: Types.ObjectId;

  @Prop({
    required: true,
    enum: PostCategory,
  })
  category: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  content: string;

  // todo: file upload
}

export const PostSchema = SchemaFactory.createForClass(Post);
