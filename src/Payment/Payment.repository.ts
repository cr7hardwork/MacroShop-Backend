import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/repositories/base.repository";
import { OrderPayment, PaymentStatus } from "./Payment";
import { InjectModel } from "@nestjs/sequelize";



@Injectable()
export class PaymentRepository extends BaseRepository<OrderPayment>{
    constructor(@InjectModel(OrderPayment) model : typeof OrderPayment){
        super(model)
    }


    public async createOrderPayment(order_id: number, status: PaymentStatus): Promise<OrderPayment> {
        return await this.model.create({
         order_id : order_id,  
          status,
        });
      }
    }