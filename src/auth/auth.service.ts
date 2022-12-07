// we can't import scrypt() and randomBytes() here because they are not immediately available
// they are collecting entropy and will be available after a few seconds
// importing crypto here only to get the types
import { BadRequestException, Injectable } from '@nestjs/common';
import crypto, { timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
import { SETTINGS } from './constants';
import type { UserAuth } from '../users/types';
import { UsersService } from '../users/users.service';

type Scrypt = typeof crypto.scrypt;
type RandomBytes = typeof crypto.randomBytes;

@Injectable()
export class AuthService {
  private scrypt: Scrypt | null = null;
  private randomBytes: RandomBytes | null = null;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserAuth | null> {
    const user = await this.usersService.findUserByEmail(
      email.toLocaleLowerCase(),
    );

    if (!user) {
      return null;
    }

    const { password, salt, userId, orgId } = user;

    const hash = await this.hashPassword(pass, salt);

    if (!timingSafeEqual(hash, Buffer.from(password, 'hex'))) {
      return null;
    }

    return { userId, orgId };
  }

  async login(user: UserAuth) {
    const payload = { org: user.orgId, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(userToSignup: CreateUserDto): Promise<UserAuth> {
    const { email, password } = userToSignup;

    const normalizedEmail = email.toLowerCase();

    const existingUser = await this.usersService.findUserByEmail(
      normalizedEmail,
    );

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const salt = await this.generateSalt();

    const hash = await this.hashPassword(password, salt);

    const userToCreate = {
      email: normalizedEmail,
      password: hash.toString('hex'),
      salt,
    };

    const userId = await this.usersService.createUser(userToCreate);

    return { userId, orgId: null };
  }

  private generateSalt(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (!this.randomBytes) {
        this.randomBytes = (await import('node:crypto')).randomBytes;
      }

      this.randomBytes(SETTINGS.saltLength, (err, buf) =>
        err ? reject(err) : resolve(buf.toString('hex')),
      );
    });
  }

  private hashPassword(password: string, salt: string): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
      if (!this.scrypt) {
        this.scrypt = (await import('node:crypto')).scrypt;
      }

      this.scrypt(password, salt, SETTINGS.hashLength, (err, derivedKey) =>
        err ? reject(err) : resolve(derivedKey),
      );
    });
  }
}
