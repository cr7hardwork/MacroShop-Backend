import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/repositories/base.repository";
import { Reviews } from "./review";
import { InjectModel } from "@nestjs/sequelize";


@Injectable()

export class ReviewRepository extends BaseRepository<Reviews>{
   constructor(@InjectModel(Reviews) model: typeof Reviews) {
       super(model);
    }


  async findAllSorted(): Promise<Reviews[]> {
    return this.model.findAll({
      order: [['createdAt', 'DESC']],
    });
  }


  async createReview(user_id: number, text: string): Promise<Reviews> {
    const review = await this.model.create({
      user_id,
      text,
    });
    return review;
  }
}