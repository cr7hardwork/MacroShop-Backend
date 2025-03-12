import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('current')
  public async getCurrentUser(@Request() req) {
    const userId = req.user.id;
    return this.userService.find(userId);
  }
}
