import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReviewDto } from './dto/createreview.dto';
import { IUserSession } from 'src/interfaces/user-session';
import { GetUser } from 'src/decorator/get-user.decorator';


@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto,
  @GetUser() user : IUserSession
) {
    return this.reviewService.createReview(user.id, createReviewDto.text);
  }
}
