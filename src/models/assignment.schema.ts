import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type AssignmentDocument = Assignment & Document;

const options: SchemaOptions = {
  timestamps: false,
  versionKey: false,
};

@Schema(options)
export class Assignment {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  user: Types.ObjectId;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop({
    required: true,
  })
  completed: boolean;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
