import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/repositories/base.repository';
import { Order } from '../order';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(@InjectModel(Order) model: typeof Order) {
    super(model);
  }

  public async createOrder(createOrder) {
    return await this.model.create(createOrder);
  }
}
