import { Body, Controller, Post, Req } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CreateReviewWithStore } from './dto/createReview.dto'
import { Review } from './entities/review.entity'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Request } from 'express'

@Controller('review')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    @ApiOperation({
        summary: '리뷰 생성 API',
    })
    @ApiResponse({
        status: 201,
        description: '리뷰 생성 성공.',
        type: Review,
    })
    createReview(
        @Body() createReviewWithStore: CreateReviewWithStore
    ): Promise<Review> {
        return this.reviewsService.create({ ...createReviewWithStore })
    }

    @Post()
    updateReview(@Req() req: Request): Promise<string> {
        return this.reviewsService.update({ ...req.body })
    }
}
