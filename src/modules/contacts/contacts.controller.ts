import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.decorator';
import { UserPayload } from '../../interface/user-payload';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiBearerAuth()
@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get('my')
  getMyContacts(@User() user: UserPayload) {
    return this.contactsService.getUsersContacts(user.id);
  }

  @Post('add')
  addNewContact(
    @Body() newContactDto: CreateContactDto,
    @User() user: UserPayload,
  ) {
    return this.contactsService.createContact(user.id, newContactDto);
  }
}
