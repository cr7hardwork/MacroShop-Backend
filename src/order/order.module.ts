import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order';
import { OrderController } from './order.controller';
import { OrderRepository } from './repositories/order.repository';
import { OrderService } from './order.service';
import { User } from 'src/modules/user/user';
import { EmailService } from 'src/EmailWithOAuth/Email.service';

@Module({
  imports: [SequelizeModule.forFeature([Order, User])],
  providers: [OrderRepository, OrderService,EmailService],
  controllers: [OrderController],
  exports: [OrderService,EmailService],
})
export class OrderModule {}
