import { Body, Controller, Delete, Post } from '@nestjs/common'
import { ReviewImagesService } from './reviewImages.service'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ReviewImage } from './entities/reviewImage.entity'
import { AddReviewimageInput } from './dto/addReviewImage.dto'

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
    addReviewImage(
        @Body() addReviewImageInput: AddReviewimageInput
    ): Promise<ReviewImage> {
        return this.reviewImagesService.add({ ...addReviewImageInput })
    }

    @Delete()
    @ApiOperation({
        summary: '이미지 삭제 API',
    })
    @ApiResponse({
        status: 201,
        description: '삭제 성공.',
    })
    deleteReviewimage() {
        return this.reviewImagesService.delete()
    }
}
