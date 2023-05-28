import {
    Body,
    Controller,
    Delete,
    Param,
    ParseUUIDPipe,
    Post,
} from '@nestjs/common'
import { ReviewImagesService } from './reviewImages.service'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ReviewImage } from './entities/reviewImage.entity'
import { AddReviewimageInput } from './dto/addReviewImage.dto'
import { DeleteReviewImageInput } from './dto/deleteReviewImage.dto'

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

    @Delete(':imageId')
    @ApiOperation({
        summary: '이미지 삭제 API',
    })
    @ApiResponse({
        status: 200,
        description: '삭제 성공.',
        type: Boolean,
    })
    deleteReviewimage(
        @Param('imageId', ParseUUIDPipe) imageId: string,
        @Body() deleteReviewimageInput: DeleteReviewImageInput
    ) {
        console.log(imageId)
        console.log(deleteReviewimageInput)
    }
}
