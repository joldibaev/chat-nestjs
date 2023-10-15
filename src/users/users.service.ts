import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(email: string, password: string) {
    const isUserExists = await this.isUserExists(email);

    if (isUserExists) {
      throw new ConflictException('User already exists');
    }

    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  async isUserExists(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return !!user;
  }

  async getUser(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
