import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common'
import { StoresService } from './stores.service'
import { Store } from './entities/store.entity'
import { FetchStoresInput } from './dto/fetchStores.dto'

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoresService) {}

    @Get(':userId')
    fetchStores(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Query() fetchStoresInput: FetchStoresInput
    ): Promise<Store[]> {
        return this.storeService.findStores({
            userId: userId,
            ...fetchStoresInput,
        })
    }
}
