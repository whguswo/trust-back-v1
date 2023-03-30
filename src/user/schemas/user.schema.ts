import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export type Assignment = {
  title: string;
  content: string;
  completed: boolean;
};

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
    required: true,
  })
  role: string;

  @Prop({
    required: true,
  })
  assignments: Assignment[];
}

export const UserSchema = SchemaFactory.createForClass(User);
