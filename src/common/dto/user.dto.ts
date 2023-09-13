import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsString } from 'class-validator';
import { CategoryValues } from '../types';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsIn(CategoryValues)
  type: string;
}

export class LoginDto {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
