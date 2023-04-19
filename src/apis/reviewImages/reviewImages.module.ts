import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewImage } from './entities/reviewImage.entity'
import { ReviewImagesService } from './reviewImages.service'

@Module({
    imports: [TypeOrmModule.forFeature([ReviewImage])],
    providers: [ReviewImagesService],
    controllers: [],
    exports: [ReviewImagesService],
})
export class ReviewImagesModule {}
