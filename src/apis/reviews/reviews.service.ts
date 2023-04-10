import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateReviewWithStore } from './dto/createReview.dto'
import { Review } from './entities/review.entity'

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewsRepository: Repository<Review>
    ) {}

    async create({
        createReviewInput,
        createStoreInput,
    }: CreateReviewWithStore): Promise<string> {
        // await this.reviewsRepository.save({})
        //TODO: img, menu 추가
        return 'body'
    }
}
