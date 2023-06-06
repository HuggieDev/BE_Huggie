import { UpdateReviewInput } from '../dto/updateReview.dto'

export interface IReivewServiceUpdate {
    reviewId: string
    updateReviewInput: UpdateReviewInput
}

export interface IReviewServiceDeleteByUserId {
    userId: string
}
