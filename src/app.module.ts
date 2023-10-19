import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { BcryptService } from './services/bcrypt.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { ChatModule } from './modules/chat/chat.module';
import { ContactsModule } from './modules/contacts/contacts.module';

const Guards = [
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
];

@Module({
  imports: [UsersModule, AuthModule, ChatModule, ContactsModule],
  providers: [PrismaService, BcryptService, ...Guards],
})
export class AppModule {}
