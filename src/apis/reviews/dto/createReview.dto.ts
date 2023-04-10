import { Review } from '../entities/review.entity'
import { PickType } from '@nestjs/mapped-types'
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator'
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

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    imgs: string[]

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    menus: string[]
}

export class CreateReviewWithStore {
    @ValidateNested()
    @Type(() => CreateReviewInput)
    createReviewInput: CreateReviewInput

    @ValidateNested()
    @Type(() => CreateStoreInput)
    createStoreInput: CreateStoreInput
}
