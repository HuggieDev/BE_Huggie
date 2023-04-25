import { InjectRepository } from '@nestjs/typeorm'
import { Store } from './entities/store.entity'
import { Injectable } from '@nestjs/common'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CreateStoreInput } from './dto/createStore.dto'

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>
    ) {}

    async createStore(createInput: CreateStoreInput): Promise<Store> {
        return await this.storeRepository.save(createInput)
    }

    async findOneWithInfo(info: FindOptionsWhere<Store>): Promise<Store> {
        return await this.storeRepository.findOne({ where: { ...info } })
    }

    async findStores({ userId }): Promise<Store[]> {
        return await this.storeRepository.find({
            where: {
                reviews: {
                    user: {
                        id: userId,
                    },
                },
            },
        })
    }
}
