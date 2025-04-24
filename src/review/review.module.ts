import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reviews } from './review';

@Module({
  imports: [SequelizeModule.forFeature([Reviews])],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}