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

export interface IReviewImagesDelete {
    imageId: string
    userId: string
    reviewId: string
}
