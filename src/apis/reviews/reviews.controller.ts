import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Query,
} from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CreateReviewWithStore } from './dto/createReview.dto'
import { Review } from './entities/review.entity'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('reviews')
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

    @Get(':userId')
    @ApiOperation({
        summary: '유저가 작성한 리뷰 조회',
    })
    @ApiResponse({
        status: 201,
        description: '조회 성공.',
        type: [Review],
    })
    fetchReviews(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Query('page') page: number
    ) {
        return this.reviewsService.findAll({ userId, page })
    }

    @Get('/review/:reviewId')
    @ApiOperation({
        summary: '리뷰 개별 조회',
    })
    @ApiResponse({
        status: 200,
        description: '조회 성공.',
        type: Review,
    })
    @ApiResponse({
        status: 422,
        description: '조회 실패',
        type: Error,
    })
    fetchReview(@Param('reviewId', ParseUUIDPipe) reviewId: string) {
        return this.reviewsService.fetchOne({ reviewId })
    }
}
