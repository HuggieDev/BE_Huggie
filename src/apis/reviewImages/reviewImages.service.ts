import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ReviewImage } from './entities/reviewImage.entity'
import { Repository } from 'typeorm'
import {
    IReviewImagesBulkCreate,
    IReviewImagesFindById,
} from './interfaces/reviewImages.interface'

@Injectable()
export class ReviewImagesService {
    constructor(
        @InjectRepository(ReviewImage)
        private reviewImagesRepository: Repository<ReviewImage>
    ) {}

    async findById({
        reviewId,
    }: IReviewImagesFindById): Promise<ReviewImage[]> {
        return await this.reviewImagesRepository.find({
            where: { review: { id: reviewId } },
            relations: ['review'],
        })
    }

    async bulkCreate({
        imgUrls,
        reviewId,
    }: IReviewImagesBulkCreate): Promise<ReviewImage[]> {
        return await this.reviewImagesRepository.save(
            imgUrls.map((imgUrl) => ({
                url: imgUrl,
                review: {
                    id: reviewId,
                },
            }))
        )
    }

    async delete({ reviewId }) {
        return await this.reviewImagesRepository.delete({
            review: reviewId,
        })
    }
}
