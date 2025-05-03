import { Body, Controller,Post, Req,Headers} from '@nestjs/common';
import { Request} from 'express';
import { PaymentService } from './Payment.service';
import { CreatePaymentDto } from './createPayment.dto';
import { ConfigService } from '@nestjs/config';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService,private readonly configService : ConfigService) {}

  @Post('create-payment')
  async createPayment(@Body() body: CreatePaymentDto) {
    return await this.paymentService.createPayment(body.amount, body.order_id);
  }

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Headers('Stripe-Signature') signature: string) {
    return this.paymentService.handleWebhook(req, signature);
  }
}