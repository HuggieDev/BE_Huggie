import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common'
import { StoresService } from './stores.service'
import { Store } from './entities/store.entity'
import { FetchStoresInput } from './dto/fetchStores.dto'
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { SearchStoresByAddress } from './interfaces/stores.interface'

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
    @Get()
    @ApiOperation({
        summary: '주소 검색을 통한 식당 조회',
    })
    @ApiQuery({
        name: 'search',
        description: '구까지 검색 가능. (서울, 서울 구로구, 구로구)',
    })
    @ApiResponse({
        status: 200,
        description: '조회 성공',
        type: SearchStoresByAddress,
    })
    @ApiResponse({
        status: 422,
        description: '조회 실패',
        type: Error,
    })
    fetchStoresByAddress(
        @Query('search') search: string
    ): Promise<SearchStoresByAddress[]> {
        return this.storeService.findStoresByAddress({ search })
    }
}
