import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../../services/prisma.service';
import { Chat } from '.prisma/client';
import { User } from '@prisma/client';

@Injectable()
export class ChatsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(usersIds: string[]) {
    const users = await this.usersService.getByIds(usersIds);

    if (users.length < 2) {
      throw new BadRequestException('Requires at least 2 users');
    }

    return this.prisma.chat.create({
      data: {
        users: {
          connect: users,
        },
      },
    });
  }

  async getChatsByUserId(userId: string) {
    const chats = await this.prisma.chat.findMany({
      distinct: 'id',
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        messages: {
          orderBy: {
            id: 'asc',
          },
          take: 1,
          select: {
            id: true,
            text: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return chats.map((chat) => ({
      id: chat.id,
      name: this.getChatName(userId, chat, chat.users),
      messages: undefined,
      lastMessage: chat.messages.at(0),
    }));
  }

  findOne(id: string) {
    return `This action returns a #${id} chat`;
  }

  update(id: string, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: string) {
    return `This action removes a #${id} chat`;
  }

  getChatName(userId: string, chat: Chat, users: Pick<User, 'id' | 'name'>[]) {
    if (chat.name) {
      return chat.name;
    }

    if (users.length > 2) {
      return users
        .slice(0, 1)
        .map((user) => user.name)
        .join(', ');
    }

    const companion = users.filter((user) => user.id !== userId).at(0);
    return companion?.name;
  }

  getMessages(id: string) {
    return this.prisma.message.findMany({
      where: { chatId: id },
      include: {
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  createMessage(authorId: string, chatId: string, text: string) {
    return this.prisma.message.create({
      data: {
        chatId,
        text,
        authorId,
      },
    });
  }
}
