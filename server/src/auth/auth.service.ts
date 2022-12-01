import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthDto } from './dto';
import { LoginDto } from './dto';
import { UsersService } from '../users/users.service';
import { User, UserDocument } from '../users/schemas/user.schema';

import { ERROR_INCORRECT_FIELDS, ERROR_SIGNUP_USER } from '../const/errors';

import { JWT_SECRET } from '../const/config';
import { SALT } from '../const/config';

export type TUserSignIn = {
  id: string;
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersServices: UsersService,
    private config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string): Promise<Object> {
    const user = await this.usersServices.findUser(email);
    if (!user) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: ERROR_SIGNUP_USER },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async register({ name, email, password }: AuthDto): Promise<TUserSignIn> {
    const user: User = await this.usersServices.findUser(email);
    if (user) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: ERROR_SIGNUP_USER },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(password, SALT);
    const newUser = await this.usersServices.createUser({
      name,
      email,
      password: hashPassword,
    });
    const token = await this.signToken(newUser._id, newUser.email);
    return { id: newUser._id, ...token };
  }

  async login({ email, password }: LoginDto): Promise<TUserSignIn> {
    const user: UserDocument = await this.usersServices.findUser(email);

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.UNAUTHORIZED, message: ERROR_INCORRECT_FIELDS },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isEqualPassword = await bcrypt.compare(password, user.password);

    if (!isEqualPassword) {
      throw new HttpException(
        { status: HttpStatus.UNAUTHORIZED, message: ERROR_INCORRECT_FIELDS },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = await this.signToken(user._id, user.email);
    return { id: user._id, ...token };
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const token = await this.jwt.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: JWT_SECRET,
      },
    );
    return { accessToken: token };
  }
}
