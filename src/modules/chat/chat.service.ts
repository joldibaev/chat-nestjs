import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class ChatService {
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

  getChatsByUserId(userId: string) {
    return this.prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
