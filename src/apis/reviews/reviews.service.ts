import {
    Inject,
    Injectable,
    UnprocessableEntityException,
    forwardRef,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { CreateReviewWithStore } from './dto/createReview.dto'
import { Review } from './entities/review.entity'
import { StoresService } from '../stores/stores.service'
import { ReviewImagesService } from '../reviewImages/reviewImages.service'
import { ReviewMenusService } from '../reviewMenus/reviewMenus.service'
import { UsersService } from '../users/users.service'
import { getPagination } from 'src/commons/util/utils'
import { IReviewServiceDeleteByUserId } from './interfaces/review.interface'

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewsRepository: Repository<Review>,

        private storesService: StoresService,
        private reviewImagesService: ReviewImagesService,
        private reviewMenusService: ReviewMenusService,

        @Inject(forwardRef(() => UsersService))
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

    async findAll({ userId, page }: { userId: string; page: number }) {
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

    async fetchOne({ reviewId }: { reviewId: string }) {
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

    async deleteByUserId({
        userId,
    }: IReviewServiceDeleteByUserId): Promise<boolean> {
        const reviews = await this.reviewsRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: ['user'],
        })

        const promiseDelete = reviews.map((e) =>
            this.deleteById({ reviewId: e.id })
        )
        const result = await Promise.all(promiseDelete)
        return result.every((bool) => bool)
    }

    async findByAddress({ search }) {
        const reviews = await this.reviewsRepository.find({
            where: {
                store: {
                    roadAddress: Like(`%${search}%`),
                    jibunAddress: Like(`%${search}%`),
                },
            },
            relations: ['user', 'store', 'reviewMenus', 'reviewImages'],
        })

        const roadAdressList = []

        if (!reviews) {
            throw new UnprocessableEntityException('리뷰가 존재하지 않습니다')
        } else {
            reviews.forEach((review) => {
                const roadAddress = review.store.roadAddress
                roadAdressList.push(roadAddress)
            })
        }

        const filteredAddresses = roadAdressList.filter((address) =>
            address.includes(search)
        )

        const searchResult = []
        filteredAddresses.forEach((address) => {
            const splitAddress = address.split(' ')
            for (let i = 1; i <= 3; i++) {
                const partialAddress = splitAddress.slice(0, i).join(' ')
                if (partialAddress.includes(search)) {
                    const existingResult = searchResult.find(
                        (result) => result.address === partialAddress
                    )
                    if (existingResult) {
                        existingResult.count++
                    } else {
                        searchResult.push({ address: partialAddress, count: 1 })
                    }
                }
            }
        })

        const result = searchResult.sort((a, b) =>
            a.address.localeCompare(b.address, 'ko-KR')
        )

        const totalCount = await this.countByAddress({ search })

        return { result, totalCount }
    }

    // 주소 기반 리뷰 건수 카운팅
    async countByAddress({ search }) {
        return await this.reviewsRepository.count({
            where: {
                store: {
                    roadAddress: Like(`%${search}%`),
                    jibunAddress: Like(`%${search}%`),
                },
            },
        })
    }

    async deleteById({ reviewId }: { reviewId: string }) {
        const review = await this.fetchOne({ reviewId })

        if (!review) {
            throw new UnprocessableEntityException('리뷰가 존재하지 않습니다.')
        }

        await this.reviewImagesService.deleteImagesByReview({
            reviewId,
        })
        await this.reviewMenusService.deleteMenusByReview({ reviewId })

        const result = await this.reviewsRepository.softDelete(reviewId)
        return result.affected > 0
    }
}
