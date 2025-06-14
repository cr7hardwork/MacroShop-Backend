import { Injectable} from '@nestjs/common';
import { BaseService } from 'src/services/base.service';
import { Order } from './order';
import { CreateOrderDto } from './dto/order.dto';
import { OrderRepository } from './repositories/order.repository';
import { updateOrderUrl } from './dto/updateOrder.dto';


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


  public async updateUrl(id : number,updateUrl : updateOrderUrl) :Promise<Order>{
     const order =  await this.repository.findById(id)
     if(!order){
      throw new Error('Order not found')
     }
     order.url = updateUrl.url
     order.updated ='updated'
     await order.save();
     return order
  }
}
