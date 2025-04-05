import { Injectable} from '@nestjs/common';
import { BaseService } from 'src/services/base.service';
import { Order } from './order';
import { CreateOrderDto } from './dto/order.dto';
import { OrderRepository } from './repositories/order.repository';


@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(protected readonly repository: OrderRepository) {
    super(repository);
  }

  public async createOrder(
    data: CreateOrderDto,
    user_id: number,
  ): Promise<Order> {
    const order = await this.repository.create({
      ...data,
      owner_id: user_id,
    });
    return order;
  }

  public async getUserOrders(user_id: number): Promise<Order[]> {
    return await this.repository.getUserOrders(user_id);
  }

  
  public async getAll(): Promise<Order[]> {
    return await this.repository.findAll();
  }
}
