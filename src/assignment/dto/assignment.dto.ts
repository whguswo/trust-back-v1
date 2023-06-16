import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class AssignmentDto {
  @ApiProperty()
  @IsString()
  username: string;

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
