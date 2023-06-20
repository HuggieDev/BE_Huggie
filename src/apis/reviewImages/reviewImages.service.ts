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
    IReviewImagesDelete,
} from './interfaces/reviewImages.interface'
import { UsersService } from '../users/users.service'
import { ReviewsService } from '../reviews/reviews.service'

@Injectable()
export class ReviewImagesService {
    constructor(
        @InjectRepository(ReviewImage)
        private reviewImagesRepository: Repository<ReviewImage>,

        @Inject(forwardRef(() => UsersService))
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
        await this.usersService.findOneById({ userId })

        const review = await this.reviewsService.fetchOne({ reviewId })

        if (!review) {
            throw new UnprocessableEntityException('리뷰가 존재하지 않습니다')
        }

        return await this.reviewImagesRepository.save({
            url,
            review,
        })
    }

    async delete({
        imageId,
        userId,
        reviewId,
    }: IReviewImagesDelete): Promise<boolean> {
        await this.usersService.findOneById({ userId })

        const review = await this.reviewsService.fetchOne({ reviewId })

        if (!review) {
            throw new UnprocessableEntityException('리뷰가 존재하지 않습니다')
        }

        await this.fetchOne({ imageId })

        const result = await this.reviewImagesRepository.softDelete({
            id: imageId,
        })
        return result.affected ? true : false
    }

    async deleteImagesByReview({ reviewId }: { reviewId: string }) {
        const imgs = await this.reviewImagesRepository.find({
            where: {
                review: {
                    id: reviewId,
                },
            },
        })
        return this.reviewImagesRepository.softRemove(imgs)
    }

    async fetchOne({ imageId }: { imageId: string }) {
        const reviewImage = await this.reviewImagesRepository.findOne({
            where: {
                id: imageId,
            },
            relations: ['review'],
        })

        if (!reviewImage) {
            throw new UnprocessableEntityException(
                '리뷰 이미지가 존재하지 않습니다.'
            )
        }
        return reviewImage
    }
}
