import { ApiProperty, PickType } from '@nestjs/swagger'
import { FetchStoresInput } from '../dto/fetchStores.dto'
import { Store } from '../entities/store.entity'

export interface IFindStores extends FetchStoresInput {
    userId: string
}

export class SearchStoresByAddress extends PickType(Store, [
    'name',
    'jibunAddress',
    'reviews',
] as const) {
    @ApiProperty({
        example: 1,
    })
    reviewsCount: number
}
