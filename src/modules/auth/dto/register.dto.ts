import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'nurlan@joldibaev.uz',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Nurlan',
  })
  @IsAlpha()
  name: string;

  @ApiProperty({
    example: '123456',
  })
  @MinLength(6)
  password: string;
}
