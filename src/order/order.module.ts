import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order';
import { OrderController } from './order.controller';
import { OrderRepository } from './repositories/order.repository';
import { OrderService } from './order.service';
import { User } from 'src/modules/user/user';
import { EmailModule } from 'src/Email/Email.module';

@Module({
  imports: [EmailModule, SequelizeModule.forFeature([Order, User])],
  providers: [OrderRepository, OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
