import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Review } from './entities/review.entity'
import { ReviewsController } from './reviews.controller'
import { ReviewsService } from './reviews.service'
import { StoreModule } from '../stores/stores.module'
import { ReviewImagesModule } from '../reviewImages/reviewImages.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Review]),
        StoreModule,
        ReviewImagesModule,
    ],
    providers: [ReviewsService],
    controllers: [ReviewsController],
})
export class ReviewsModule {}
