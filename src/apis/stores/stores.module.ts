import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Store } from './entities/store.entity'
import { StoresService } from './stores.service'

@Module({
    imports: [TypeOrmModule.forFeature([Store])],
    providers: [StoresService],
    controllers: [],
    exports: [StoresService],
})
export class StoreModule {}
