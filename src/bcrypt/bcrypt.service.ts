import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async compare(value: string, hash: string) {
    return await bcrypt.compare(value, hash);
  }
  async generateHash(value: string) {
    const salt = await this.generateSalt();
    return await bcrypt.hash(value, salt);
  }

  async generateSalt() {
    return bcrypt.genSalt();
  }
}
