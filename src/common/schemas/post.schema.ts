import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { CategoryValues } from '../types';

export type PostDocument = Post & Document;

const options: SchemaOptions = {
  timestamps: false,
  versionKey: false,
};

@Schema(options)
export class Post {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Users',
  })
  user: Types.ObjectId;

  @Prop({
    required: true,
    enum: CategoryValues,
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
