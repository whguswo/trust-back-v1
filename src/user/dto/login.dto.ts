import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
