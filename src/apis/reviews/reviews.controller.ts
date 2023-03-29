import { Controller, Post, Req } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { Request } from 'express'

@Controller('review')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    createReview(@Req() req: Request): Promise<string> {
        return this.reviewsService.create({ ...req.body })
    }
}
