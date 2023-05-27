import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateReviewWithStore } from './dto/createReview.dto'
import { Review } from './entities/review.entity'
import { StoresService } from '../stores/stores.service'
import { ReviewImagesService } from '../reviewImages/reviewImages.service'
import { ReviewMenusService } from '../reviewMenus/reviewMenus.service'
import { UsersService } from '../users/users.service'
import { getPagination } from 'src/commons/util/utils'

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewsRepository: Repository<Review>,

        private storesService: StoresService,
        private reviewImagesService: ReviewImagesService,
        private reviewMenusService: ReviewMenusService,
        private usersService: UsersService
    ) {}

    async create({
        createReviewInput,
        createStoreInput,
    }: CreateReviewWithStore): Promise<Review> {
        const { menus, imgs, userId, ...rest } = createReviewInput
        let reviewImages = null
        let reviewMenus = null

        const user = await this.usersService.findOneById({ userId })

        if (!user) {
            throw new UnprocessableEntityException('유저가 존재하지 않습니다')
        }

        let store = await this.storesService.findOneWithInfo({
            name: createStoreInput.name,
            lat: createStoreInput.lat,
            lng: createStoreInput.lng,
        })

        if (!store) {
            store = await this.storesService.createStore(createStoreInput)
        }

        const review = await this.reviewsRepository.save({
            ...rest,
            store,
            user,
        })

        if (imgs.length > 0) {
            reviewImages = await this.reviewImagesService.bulkCreate({
                imgUrls: imgs,
                reviewId: review.id,
            })
        }

        if (menus.length > 0) {
            reviewMenus = await this.reviewMenusService.bulkCreate({
                menus,
                reviewId: review.id,
            })
        }

        return await this.reviewsRepository.save({
            ...review,
            reviewImages,
            reviewMenus,
        })
    }

    async findAll({ userId, page }) {
        const pageSize = 10
        const skip = getPagination({ page, pageSize })

        return this.reviewsRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: ['user'],
            take: pageSize,
            skip,
        })
    }

    async fetchOne({ reviewId }) {
        const review = await this.reviewsRepository.findOne({
            where: {
                id: reviewId,
            },
            relations: ['user', 'store', 'reviewMenus', 'reviewImages'],
        })

        if (!review) {
            throw new UnprocessableEntityException('리뷰가 존재하지 않습니다')
        }

        return review
    }
}
