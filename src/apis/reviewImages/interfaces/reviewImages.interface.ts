export interface IReviewImagesBulkCreate {
    imgUrls: string[]
    reviewId: string
}

export interface IReviewImagesFindById {
    reviewId: string
}

export interface IReviewImagesDelete {
    reviewId: string
}

export interface IReveiwImagesAdd {
    userId: string
    reviewId: string
    url: string
}
