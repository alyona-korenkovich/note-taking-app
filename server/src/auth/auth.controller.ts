import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, TUserSignIn } from './auth.service';
import { AuthDto, LoginDto } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() newUser: AuthDto): Promise<TUserSignIn> {
    return this.authService.register(newUser);
  }

  @Post('/login')
  login(@Body() user: LoginDto): Promise<TUserSignIn> {
    return this.authService.login(user);
  }
}
