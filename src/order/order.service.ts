import { Injectable } from "@nestjs/common";
import { BaseService } from "src/services/base.service";
import { Order } from "./order";
import { OrderRepository } from "./repositories/order.repository";
import { CreateOrderDto } from "./dto/order.dto";

@Injectable()
export class OrderService extends BaseService<Order>{
    constructor(private readonly repoository : OrderRepository){
        super(repoository)
    }


    public async createOrder(data: CreateOrderDto, user_id: number): Promise<Order> {
        const order = await this.repository.create({
            ...data,
            owner_id: user_id
        });
        return order;
    }
}