import { ApiProperty } from '@nestjs/swagger'
import { UpdateReviewInput } from '../dto/updateReview.dto'

export interface IReivewServiceUpdate {
    reviewId: string
    updateReviewInput: UpdateReviewInput
}

export interface IReviewServiceDeleteByUserId {
    userId: string
}

export class SearchReviewByAddress {
    @ApiProperty({
        example: { '서울특별시 구로구': 20, '서울특별시 구로구 디지털로': 15 },
        required: true,
    })
    searchResult: object

    @ApiProperty({
        example: 15,
        required: true,
    })
    totalCount: number
}
