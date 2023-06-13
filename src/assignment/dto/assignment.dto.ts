import { IsBoolean, IsString } from 'class-validator';

export class AssignmentDto {
  @IsString()
  username: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;
}

export class AssignmentStatus {
  @IsString()
  readonly assignId: string;

  @IsBoolean()
  readonly status: boolean;
}
