import { ApiProperty, PickType } from '@nestjs/swagger'
import { Store } from '../entities/store.entity'
import { IsInt } from 'class-validator'
import { Type } from 'class-transformer'

export class FetchStoresInput extends PickType(Store, ['lng', 'lat'] as const) {
    @ApiProperty({ description: '반경 몇 미터 기준' })
    @Type(() => Number)
    @IsInt()
    radius: number
}
