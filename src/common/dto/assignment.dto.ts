import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsMongoId, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { CategoryValues } from '../types';

export class CreateAssignmentDto {
  @ApiProperty()
  @IsMongoId()
  readonly user: ObjectId;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsNumber()
  readonly month: number;

  @ApiProperty()
  @IsNumber()
  readonly week: number;

  @ApiProperty()
  @IsString()
  @IsIn(CategoryValues)
  readonly category: string;
}

export class AssignmentStatus {
  @ApiProperty()
  @IsString()
  readonly assignId: string;

  @ApiProperty()
  @IsBoolean()
  readonly status: boolean;
}
