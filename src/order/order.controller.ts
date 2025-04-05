import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { IUserSession } from 'src/interfaces/user-session';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Order } from './order';
import { Roles } from 'src/guards/roles.decorator';
import { Role } from 'src/modules/user/user';
import { RoleGuard } from 'src/guards/roles.guard';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) { }

  @UseGuards(AuthGuard)
  @Post('')
  async createOrder(
    @Body() createOrder: CreateOrderDto,
    @GetUser() user: IUserSession,
  ): Promise<Order> {
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return await this.orderService.createOrder(createOrder, user.id);
  }

  @UseGuards(AuthGuard)
  @Get('user-orders')
  async getUserOrders(@GetUser() user: IUserSession): Promise<Order[]> {
    return this.orderService.getUserOrders(user.id);
  }
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RoleGuard)
  @Get('all')
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAll();
  }
}
