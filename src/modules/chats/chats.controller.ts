import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.decorator';
import { UserPayload } from '../../interface/user-payload';

@ApiBearerAuth()
@ApiTags('chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post()
  createNewChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto.users);
  }

  @Get('my')
  getMyChats(@User() user: UserPayload) {
    return this.chatService.getChatsByUserId(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
