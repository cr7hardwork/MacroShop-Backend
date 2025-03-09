import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  public async getCurrentUser(@Request() req) {
    const userId = req.user.id;
    return this.userService.find(userId);
  }
}
