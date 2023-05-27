import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewImage } from './entities/reviewImage.entity'
import { ReviewImagesService } from './reviewImages.service'
import { ReviewImagesController } from './reviewImages.controller'

@Module({
    imports: [TypeOrmModule.forFeature([ReviewImage])],
    providers: [ReviewImagesService],
    controllers: [ReviewImagesController],
    exports: [ReviewImagesService],
})
export class ReviewImagesModule {}
