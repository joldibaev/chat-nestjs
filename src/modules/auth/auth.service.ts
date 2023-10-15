import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BcryptService } from '../../services/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload';
import { Token } from './interface/token';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<Token> {
    const isUserExists = await this.usersService.isUserExists(email);

    if (isUserExists) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.usersService.create(email, password);

    return this.getToken(newUser.email);
  }

  async login(email: string, password: string): Promise<Token> {
    const isUserExists = await this.usersService.isUserExists(email);

    if (!isUserExists) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.get(email);

    const isMatch = await this.bcryptService.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return this.getToken(user.email);
  }

  private getToken(userEmail: string): Token {
    const payload: JwtPayload = { email: userEmail };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
