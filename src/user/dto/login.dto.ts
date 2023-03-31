import { IsString } from 'class-validator';

export class loginDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
