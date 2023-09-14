import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

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
}

export class AssignmentStatus {
  @ApiProperty()
  @IsString()
  readonly assignId: string;

  @ApiProperty()
  @IsBoolean()
  readonly status: boolean;
}
