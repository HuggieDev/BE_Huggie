import { Review } from '../entities/review.entity'
import { IntersectionType, PickType } from '@nestjs/mapped-types'
import { IsNotEmpty } from 'class-validator'
import { CreateStoreInput } from 'src/apis/stores/dto/createStore.dto'

export class CreateReviewInput extends PickType(Review, [
    'contents',
    'score',
    'visitDate',
] as const) {
    @IsNotEmpty()
    userId: string
}

export class CreateReviewWithStore {
    // createReviewInput: CreateReviewInput
    // createStoreInput: CreateStoreInput
    aa: {
        bb: string
    }
}
