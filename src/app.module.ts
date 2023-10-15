import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

const Guards = [
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
];

@Module({
  imports: [UsersModule, AuthModule],
  providers: [PrismaService, AuthService, BcryptService, ...Guards],
})
export class AppModule {}
