import { Repository } from 'typeorm'
import { ReviewMenu } from './entities/reviewMenu.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { IReviewImagesBulkCreate } from './interfaces/reviewMenus.interface'

@Injectable()
export class ReviewMenusService {
    constructor(
        @InjectRepository(ReviewMenu)
        private reviewMenuRepository: Repository<ReviewMenu>
    ) {}

    async bulkCreate({
        menus,
        reviewId,
    }: IReviewImagesBulkCreate): Promise<ReviewMenu[]> {
        return await this.reviewMenuRepository.save(
            menus.map((menu) => ({
                name: menu,
                review: { id: reviewId },
            }))
        )
    }
}
