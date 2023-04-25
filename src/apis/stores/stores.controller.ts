import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { StoresService } from './stores.service'
import { Store } from './entities/store.entity'

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoresService) {}

    @Get(':userId')
    fetchStores(
        @Param('userId', ParseUUIDPipe) userId: string
    ): Promise<Store[]> {
        return this.storeService.findStores({ userId: userId })
    }
}
