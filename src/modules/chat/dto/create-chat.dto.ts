import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({
    required: false,
    description: 'Group name',
  })
  name: string;

  @ApiProperty({
    example: ['userId1', 'userId2'],
  })
  users: string[];
}
