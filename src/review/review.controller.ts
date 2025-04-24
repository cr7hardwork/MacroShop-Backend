import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReviewDto } from './dto/createreview.dto';


@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    const { username, text } = createReviewDto;
    return this.reviewService.createReview(username, text);
  }
}
