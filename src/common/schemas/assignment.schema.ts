import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { CategoryValues } from '../types';

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
    ref: 'Users',
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

  @Prop({
    required: true,
  })
  month: number;

  @Prop({
    required: true,
  })
  week: number;

  @Prop({
    required: true,
    enum: CategoryValues,
  })
  category: string;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
