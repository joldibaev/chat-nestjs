import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'nurlan@joldibaev.uz',
  })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  password: string;
}
