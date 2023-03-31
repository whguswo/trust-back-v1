import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Assginment } from '../entities/assignment.entity';

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
    required: true,
  })
  role: string;

  @Prop({
    required: true,
  })
  assignments: Assginment[];
}

export const UserSchema = SchemaFactory.createForClass(User);
