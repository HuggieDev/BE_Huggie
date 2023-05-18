import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Store } from './entities/store.entity'
import { StoresService } from './stores.service'
import { StoreController } from './stores.controller'
import { UsersModule } from '../users/users.module'

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([Store])],
    providers: [StoresService],
    controllers: [StoreController],
    exports: [StoresService],
})
export class StoreModule {}
