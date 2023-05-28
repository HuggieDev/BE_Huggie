import {
    Inject,
    Injectable,
    UnprocessableEntityException,
    forwardRef,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ReviewImage } from './entities/reviewImage.entity'
import { Repository } from 'typeorm'
import {
    IReveiwImagesAdd,
    IReviewImagesBulkCreate,
} from './interfaces/reviewImages.interface'
import { UsersService } from '../users/users.service'
import { ReviewsService } from '../reviews/reviews.service'

@Injectable()
export class ReviewImagesService {
    constructor(
        @InjectRepository(ReviewImage)
        private reviewImagesRepository: Repository<ReviewImage>,

        private usersService: UsersService,

        @Inject(forwardRef(() => ReviewsService))
        private reviewsService: ReviewsService
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

    async add({
        userId,
        reviewId,
        url,
    }: IReveiwImagesAdd): Promise<ReviewImage> {
        const user = await this.usersService.findOneById({ userId })

        if (!user) {
            throw new UnprocessableEntityException('유저가 존재하지 않습니다')
        }

        const review = await this.reviewsService.fetchOne({ reviewId })

        if (!review) {
            throw new UnprocessableEntityException('리뷰가 존재하지 않습니다')
        }

        return await this.reviewImagesRepository.save({
            url,
            review,
        })
    }

    async delete({ imageId, userId, reviewId }): Promise<boolean> {
        const user = await this.usersService.findOneById({ userId })

        if (!user) {
            throw new UnprocessableEntityException('유저가 존재하지 않습니다')
        }

        const review = await this.reviewsService.fetchOne({ reviewId })

        if (!review) {
            throw new UnprocessableEntityException('리뷰가 존재하지 않습니다')
        }

        const result = await this.reviewImagesRepository.softDelete({
            id: imageId,
        })
        return result.affected ? true : false
    }
}
