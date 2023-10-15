import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, BcryptService],
  exports: [UsersService],
})
export class UsersModule {}
