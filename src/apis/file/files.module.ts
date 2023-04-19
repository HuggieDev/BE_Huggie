import { Module } from '@nestjs/common'
import { FilesController } from './files.controller'
import { ReviewImagesModule } from '../reviewImages/reviewImages.module'
import { FilesService } from './files.service'

@Module({
    imports: [ReviewImagesModule],
    providers: [FilesService],
    controllers: [FilesController],
})
export class FilesModule {}
