import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  async createUser(user: RegisterUserDto): Promise<UserDocument> {
    const newUser = new this.usersModel(user);
    return newUser.save();
  }

  async findUser(email: string): Promise<UserDocument | undefined> {
    return this.usersModel.findOne({ email });
  }
}
