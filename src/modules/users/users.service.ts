import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { BcryptService } from '../../services/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(email: string, name: string, password: string) {
    const isUserExists = await this.isUserExists(email);

    if (isUserExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.bcryptService.generateHash(password);

    return this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  }

  async isUserExists(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return !!user;
  }

  async get(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  getAll() {
    return this.prisma.user.findMany();
  }

  async getByIds(usersIds: string[]) {
    return this.prisma.user.findMany({
      where: { id: { in: usersIds } },
      distinct: ['id'],
    });
  }
}
