import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The email for user' })
  email: string;

  @ApiProperty({ description: 'The username for user' })
  username: string;

  @ApiProperty({ description: 'The password for user' })
  password: string;

  @ApiProperty({ description: 'The role for user' })
  role: string;
}
