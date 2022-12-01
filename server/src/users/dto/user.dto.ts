import { IsNotEmpty, IsEmail } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UserDto {
  @IsNotEmpty()
  id: ObjectId;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
