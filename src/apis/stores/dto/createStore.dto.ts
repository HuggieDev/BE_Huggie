import { OmitType } from '@nestjs/mapped-types'
import { Store } from '../entities/store.entity'

export class CreateStoreInput extends OmitType(Store, ['id'] as const) {}
