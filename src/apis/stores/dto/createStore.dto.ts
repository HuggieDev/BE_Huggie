import { OmitType } from '@nestjs/swagger'
import { Store } from '../entities/store.entity'

export class CreateStoreInput extends OmitType(Store, ['id'] as const) {}
