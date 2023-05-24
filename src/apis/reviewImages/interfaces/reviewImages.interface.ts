export interface IReviewImagesBulkCreate {
    imgUrls: string[]
    reviewId: string
}

export interface IReviewImagesFindById {
    reviewId: string
}
