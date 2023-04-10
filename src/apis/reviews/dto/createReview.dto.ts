import { Review } from '../entities/review.entity'
import { PickType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator'
import { CreateStoreInput } from 'src/apis/stores/dto/createStore.dto'
import { Type } from 'class-transformer'

export class CreateReviewInput extends PickType(Review, [
    'contents',
    'score',
    'visitDate',
] as const) {
    @IsUUID()
    @IsNotEmpty()
    userId: string
}

export class CreateReviewWithStore {
    @ValidateNested()
    @Type(() => CreateReviewInput)
    createReviewInput: CreateReviewInput

    @ValidateNested()
    @Type(() => CreateStoreInput)
    createStoreInput: CreateStoreInput
}
