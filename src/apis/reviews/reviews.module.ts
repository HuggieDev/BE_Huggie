import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Review } from './entities/review.entity'
import { ReviewsController } from './reviews.controller'
import { ReviewsService } from './reviews.service'
import { StoreModule } from '../stores/stores.module'
import { ReviewImagesModule } from '../reviewImages/reviewImages.module'
import { ReviewMenusModule } from '../reviewMenus/reviewMenus.module'
import { UsersModule } from '../users/users.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Review]),
        StoreModule,
        ReviewImagesModule,
        ReviewMenusModule,
        forwardRef(() => UsersModule),
    ],
    providers: [ReviewsService],
    controllers: [ReviewsController],
    exports: [ReviewsService],
})
export class ReviewsModule {}
