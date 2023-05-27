import { ApiProperty, PickType } from '@nestjs/swagger'
import { ReviewImage } from '../entities/reviewImage.entity'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class AddReviewimageInput extends PickType(ReviewImage, [
    'url',
] as const) {
    @ApiProperty({
        example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    userId: string

    @ApiProperty({
        example: 'c5972461-eefd-4477-837c-75cc741d0663',
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    reviewId: string
}
