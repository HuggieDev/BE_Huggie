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
        example: [
            { address: '서울특별시 구로구', count: 20 },
            { address: '서울특별시 구로구 디지털로', count: 15 },
        ],
    })
    result: [string, number]

    @ApiProperty({
        example: 15,
    })
    totalCount: number
}
