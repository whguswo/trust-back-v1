import { IsArray, IsString } from 'class-validator';
import { Assginment } from '../entities/assignment.entity';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  password: string;

  @IsString()
  readonly role: string;

  @IsArray()
  readonly assignments: Assginment[];
}
