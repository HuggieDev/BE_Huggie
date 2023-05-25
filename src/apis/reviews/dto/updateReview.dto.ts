import { PickType } from '@nestjs/swagger'
import { CreateReviewInput } from './createReview.dto'

export class UpdateReviewInput extends PickType(CreateReviewInput, [
    'userId',
    'imgs',
] as const) {}
