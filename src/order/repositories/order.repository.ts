import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/repositories/base.repository';
import { Order } from '../order';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/user/user';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(@InjectModel(Order) model: typeof Order) {
    super(model);
  }

  public async createOrder(createOrder) {
    return await this.model.create(createOrder);
  }

  public async getUserOrders(user_id: number): Promise<Order[]> {
    return this.model.findAll({
      where: {
        owner_id: user_id,
      },
      include: [User],
    });
  }

  public async findOrderById(order_id: number): Promise<Order> {
    return await this.model.findOne({
      where: {
        id: order_id,
      },
        });
  }
}

