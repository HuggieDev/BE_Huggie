import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Store } from './entities/store.entity'
import { StoresService } from './stores.service'
import { StoreController } from './stores.controller'
import { UsersModule } from '../users/users.module'
import { ReviewsModule } from '../reviews/reviews.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Store]),
        forwardRef(() => UsersModule),
        forwardRef(() => ReviewsModule),
    ],
    providers: [StoresService],
    controllers: [StoreController],
    exports: [StoresService],
})
export class StoreModule {}
