import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

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
    type: Types.ObjectId,
  })
  _id: Types.ObjectId;

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
    enum: ['USER', 'ADMIN'],
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
