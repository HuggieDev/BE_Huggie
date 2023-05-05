import { PickType } from '@nestjs/swagger'
import { Store } from '../entities/store.entity'
import { IsInt } from 'class-validator'

export class FetchStoresInput extends PickType(Store, ['lng', 'lat'] as const) {
    @IsInt()
    radius: number
}
