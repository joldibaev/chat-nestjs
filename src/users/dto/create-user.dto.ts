import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'nurlan@joldibaev.uz',
  })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  password: string;
}
