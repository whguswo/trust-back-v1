import { IsIn, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsIn(['web', 'pwn', 'rev'])
  readonly category: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;
}
