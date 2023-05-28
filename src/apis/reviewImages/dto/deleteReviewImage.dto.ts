import { PickType } from '@nestjs/swagger'
import { AddReviewimageInput } from './addReviewImage.dto'

export class DeleteReviewImageInput extends PickType(AddReviewimageInput, [
    'reviewId',
    'userId',
] as const) {}
