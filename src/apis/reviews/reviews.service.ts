import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Review } from './entities/review.entity'

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewsRepository: Repository<Review>
    ) {}

    async create(body): Promise<string> {
        // await this.reviewsRepository.save({})
        return 'body'
    }
}
