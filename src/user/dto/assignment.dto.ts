import { IsBoolean, IsString } from 'class-validator';

export class AssignmentDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsBoolean()
  readonly completed: boolean;
}
