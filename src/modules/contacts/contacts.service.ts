import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ContactsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  getUsersContacts(userId: string) {
    return this.prisma.user.findFirst({
      where: { id: userId },
      select: { contacts: true },
    });
  }

  async createContact(userId: string, createContactDto: CreateContactDto) {
    const contact = await this.usersService.get(createContactDto.email);

    if (contact.id === userId) {
      throw new BadRequestException("You can't add yourself to contacts");
    }

    const isAlreadyExists = await this.prisma.contact.findFirst({
      where: {
        contact: {
          email: createContactDto.email,
        },
      },
    });

    if (isAlreadyExists) {
      throw new ConflictException('This contact is already exist');
    }

    return this.prisma.contact.create({
      data: {
        name: createContactDto.name,
        ownerId: userId,
        contactId: contact.id,
      },
    });
  }
}
