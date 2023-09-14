import { IsIn, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryValues } from '../types';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsIn(CategoryValues)
  readonly category: string;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;
}

export class ManagePostDto {
  @ApiProperty()
  @IsString()
  @IsIn(CategoryValues)
  readonly category: string;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;
}

