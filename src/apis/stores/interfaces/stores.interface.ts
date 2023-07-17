import { ApiProperty } from '@nestjs/swagger'
import { FetchStoresInput } from '../dto/fetchStores.dto'
import { Store } from '../entities/store.entity'

export interface IFindStores extends FetchStoresInput {
    userId: string
}

export class SearchStoresByAddress extends Store {
    @ApiProperty({
        example: 1,
    })
    reviewsCount: number
}
