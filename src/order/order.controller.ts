import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/order.dto";
import { GetUser } from "src/decorators/get-user.decorator";
import { IUserSession } from "src/interfaces/user-session";
import { OrderService } from "./order.service";


@Controller('order')

export class OrderController {
    constructor(private orderService: OrderService) { }

    @Post('')
    async createOrder(@Body() createOrder: CreateOrderDto, @GetUser() user: IUserSession): Promise<void> {
        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }
        await this.orderService.createOrder(createOrder, user.id);
    }
}