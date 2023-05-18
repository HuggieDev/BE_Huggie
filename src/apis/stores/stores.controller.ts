import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common'
import { StoresService } from './stores.service'
import { Store } from './entities/store.entity'
import { FetchStoresInput } from './dto/fetchStores.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoresService) {}

    @Get(':userId')
    @ApiOperation({
        summary: '반경 중심으로 유저가 작성한 가게 조회',
    })
    @ApiResponse({
        status: 201,
        description: '조회 성공.',
        type: [Store],
    })
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
