import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewImage } from './entities/reviewImage.entity'
import { ReviewImagesService } from './reviewImages.service'
import { ReviewImagesController } from './reviewImages.controller'
import { UsersModule } from '../users/users.module'
import { ReviewsModule } from '../reviews/reviews.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([ReviewImage]),
        forwardRef(() => ReviewsModule),
        forwardRef(() => UsersModule),
    ],
    providers: [ReviewImagesService],
    controllers: [ReviewImagesController],
    exports: [ReviewImagesService],
})
export class ReviewImagesModule {}
