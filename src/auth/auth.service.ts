import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-signup.dto';
import { PasswordUtils } from 'src/utils/password.utils';
import { UserService } from 'src/modules/user/user.service';
import { BaseService } from 'src/services/base.service';
import { User } from 'src/modules/user/user';
import { AuthRepository } from './repositories/auth.repository';
import { UserSignInDto } from './dto/user-signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends BaseService<User> {
  constructor(
    repository: AuthRepository,
    private jwtService: JwtService,
    private userService: UserService,
  ) {
    super(repository);
  }

  public async signIn(userData: UserSignInDto) {
    const { email, password } = userData;
    const user = await this.validateUser(email, password);

    if (user) {
      const payload = { email: user.email, id: user.id };
      const accessToken = this.jwtService.sign(payload);
      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Invalid username or email');
    }
  }

  public async signUp(userData: UserSignUpDto) {
    const password = await PasswordUtils.hashPassword(userData.password);
    const userDataWithHashedPassword = {
      ...userData,
      password,
    };
    return this.userService.create(userDataWithHashedPassword);
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ where: { email } });

    if (!user) {
      return null;
    }
    const isMatch = await PasswordUtils.comparePassword(
      password,
      user.password,
    );

    if (!isMatch) {
      return null;
    }
    return user;
  }
}
