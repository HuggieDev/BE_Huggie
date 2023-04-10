import { Review } from '../entities/review.entity'
import { PickType } from '@nestjs/mapped-types'

export class CreateReviewInput extends PickType(Review, [
    'contents',
    'score',
    'visitDate',
] as const) {
    userId: string
}
