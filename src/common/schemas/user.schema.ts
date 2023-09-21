import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryValues } from '../types';

export type UserDocument = User & Document;

const options: SchemaOptions = {
  timestamps: false,
  versionKey: false,
};

@Schema(options)
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: false,
  })
  name: string;

  @Prop({
    required: true,
  })
  hashtag: string[];

  @Prop({
    required: true,
    enum: CategoryValues,
  })
  type: string;

  @Prop({
    required: true,
    enum: ['A', 'U'],
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
