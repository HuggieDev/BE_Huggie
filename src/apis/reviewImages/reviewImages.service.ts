import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ReviewImage } from './entities/reviewImage.entity'
import { Repository } from 'typeorm'
import { IReviewImagesBulkCreate } from './interfaces/reviewImages.interface'

@Injectable()
export class ReviewImagesService {
    constructor(
        @InjectRepository(ReviewImage)
        private reviewImagesRepository: Repository<ReviewImage>
    ) {}

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

    async add() {
        console.log('이미지 추가 성공')
    }
}
