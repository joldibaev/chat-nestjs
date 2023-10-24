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
import { CreateMessageDto } from './dto/create-message.dto';

@ApiBearerAuth()
@ApiTags('chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post()
  createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto.users);
  }

  @Get('my')
  getMyChats(@User() user: UserPayload) {
    return this.chatService.getChatsByUserId(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string) {
    return this.chatService.getMessages(id);
  }

  @Post(':id/messages')
  createMessages(
    @User() user: UserPayload,
    @Param('id') id: string,
    @Body() messageDto: CreateMessageDto,
  ) {
    return this.chatService.createMessage(user.id, id, messageDto.message);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(id);
  }
}
