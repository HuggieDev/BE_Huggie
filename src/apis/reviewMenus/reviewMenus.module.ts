import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewMenu } from './entities/reviewMenu.entity'
import { ReviewMenusService } from './reviewMenus.service'

@Module({
    imports: [TypeOrmModule.forFeature([ReviewMenu])],
    providers: [ReviewMenusService],
    exports: [ReviewMenusService],
})
export class ReviewMenusModule {}
