import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { IUserSession } from 'src/interfaces/user-session';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Order } from './order';
import { updateOrderUrl } from './dto/updateOrder.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { EmailService } from 'src/EmailWithOAuth/Email.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService,private emailService : EmailService) { }

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
  @UseGuards(AuthGuard,AdminGuard)
  @Get('all')
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAll();
  }

  @UseGuards(AuthGuard,AdminGuard)
  @Put(':id/update-url')
  async updateUrl(
    @Param('id') id: number,
    @Body() updateUrl: updateOrderUrl,
  ) {
    const result =  await this.orderService.updateUrl(id, updateUrl);


     await this.emailService.sendEmail();

     return result
  }

}
