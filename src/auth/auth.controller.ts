import { Body, Controller, Post } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-signup.dto';
import { AuthService } from './auth.service';
import { UserSignInDto } from './dto/user-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() userSingUpDto: UserSignUpDto) {
    try {
      const user = await this.authService.signUp(userSingUpDto);
      return user;
    } catch (error) {
      console.error('Signup Error:', error);
    }
  }

  @Post('signin')
  async signIn(@Body() userSignin: UserSignInDto) {
    try {
      return this.authService.signIn(userSignin);
    } catch (error) {
      return error;
    }
  }
}
