import { Controller, Post } from '@nestjs/common'
import { ReviewImagesService } from './reviewImages.service'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ReviewImage } from './entities/reviewImage.entity'

@Controller('reviewImage')
export class ReviewImagesController {
    constructor(private readonly reviewImagesService: ReviewImagesService) {}

    @Post()
    @ApiOperation({
        summary: '다른 이미지 추가 API',
    })
    @ApiResponse({
        status: 201,
        description: '추가 성공.',
        type: ReviewImage,
    })
    addReviewImage() {
        return this.reviewImagesService.add()
    }
}
