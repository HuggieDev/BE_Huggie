import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Query,
} from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CreateReviewWithStore } from './dto/createReview.dto'
import { Review } from './entities/review.entity'
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { SearchReviewByAddress } from './interfaces/review.interface'

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

    @Get()
    @ApiOperation({
        summary: '주소 검색을 통한 지역 조회',
    })
    @ApiQuery({
        name: 'search',
        description: '구까지 검색 가능. (서울, 서울 구로구, 구로구)',
    })
    @ApiResponse({
        status: 200,
        description: '조회 성공',
        type: SearchReviewByAddress,
    })
    @ApiResponse({
        status: 422,
        description: '조회 실패',
        type: Error,
    })
    fetchReviewsByAddress(@Query('search') search: string) {
        return this.reviewsService.findByAddress({ search })
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

    @Delete('/review/:reviewId')
    @ApiOperation({
        summary: '리뷰 개별 삭제',
    })
    @ApiResponse({
        status: 200,
        description: '삭제 성공.',
        type: Boolean,
    })
    @ApiResponse({
        status: 422,
        description: '리뷰가 존재하지 않습니다',
        type: Error,
    })
    deleteReview(@Param('reviewId', ParseUUIDPipe) reviewId: string) {
        return this.reviewsService.deleteById({ reviewId })
    }
}
