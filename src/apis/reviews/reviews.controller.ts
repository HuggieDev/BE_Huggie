import { Body, Controller, Post } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CreateReviewWithStore } from './dto/createReview.dto'

@Controller('review')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    createReview(
        @Body() createReviewWithStore: CreateReviewWithStore
    ): Promise<string> {
        return this.reviewsService.create({ ...createReviewWithStore })
    }
}
