import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
  ) {}

  async register(email: string, password: string) {
    const isUserExists = await this.usersService.isUserExists(email);

    if (isUserExists) {
      throw new ConflictException('User already exists');
    }

    return await this.usersService.create(email, password);
  }

  async login(email: string, password: string) {
    const isUserExists = await this.usersService.isUserExists(email);

    if (!isUserExists) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.get(email);
    const isMatch = await this.bcryptService.compare(user.password, password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
