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
import { ApiProperty } from '@nestjs/swagger'

export class CreateReviewInput extends PickType(Review, [
    'contents',
    'score',
    'visitDate',
] as const) {
    @ApiProperty({
        example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    userId: string

    @ApiProperty({
        type: '[string]',
        example: ['url1', 'url2'],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    imgs: string[]

    @ApiProperty({
        type: '[string]',
        example: ['해장국', '수육'],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    menus: string[]
}

export class CreateReviewWithStore {
    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateReviewInput)
    createReviewInput: CreateReviewInput

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateStoreInput)
    createStoreInput: CreateStoreInput
}
