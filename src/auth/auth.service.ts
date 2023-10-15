import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
  ) {}

  async login(email: string, password: string) {
    const isUserExists = await this.usersService.isUserExists(email);

    if (!isUserExists) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.getUser(email);
    const isMatch = await this.bcryptService.compare(user.password, password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
