import { Module } from '@nestjs/common';
import { PaymentController } from './Payment.controller';
import { PaymentService } from './Payment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/order/order';
import { OrderPayment } from './Payment';
import { PaymentRepository } from './payment.repository';
import { OrderRepository } from 'src/order/repositories/order.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderPayment])],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, OrderRepository,ConfigService],
})
export class PaymentModule {}
