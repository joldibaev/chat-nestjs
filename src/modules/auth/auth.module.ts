import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { BcryptService } from '../../services/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env['JWT_SECRET_KEY'],
      signOptions: { expiresIn: process.env['JWT_EXPIRE_TIME'] },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
})
export class AuthModule {}
