import { Body, Controller, Post, Req } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import {
    CreateReviewInput,
    CreateReviewWithStore,
} from './dto/createReview.dto'

@Controller('review')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    createReview(@Body() createReviewWithStore: CreateReviewWithStore): string {
        console.log('create')
        return 'aa'
        // return this.reviewsService.create({ ...createReviewWithStore })
    }
    // {
    //     "contents" : "내용",
    //     "score" : 4.0,
    //     "visitDate" : "Tue Apr 04 2023 22:06:23 GMT+0900 (한국 표준시)",
    //     "userId" : "uuid"
    // }
    // "createStoreInput": {
    //     "name" : "은희네",
    //     "lat" : 12.123,
    //     "lng" : 139.123,
    //     "roadAddress" : "도로명",
    //     "jibunAddress" : "지번"
    // }
}
