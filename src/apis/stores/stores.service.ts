import { InjectRepository } from '@nestjs/typeorm'
import { Store } from './entities/store.entity'
import { Injectable } from '@nestjs/common'
import { Between, FindOptionsWhere, Repository } from 'typeorm'
import { CreateStoreInput } from './dto/createStore.dto'
import { IFindStores } from './interfaces/stores.interface'

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

    async findStores({
        userId,
        lat,
        lng,
        radius,
    }: IFindStores): Promise<Store[]> {
        //TODO: radius

        return await this.storeRepository.find({
            where: {
                // FIXME: 반경에서 좌표를 빼는게 맞아..?
                lat: Between(lat - radius, lat + radius),
                lng: Between(lng - radius, lng + radius),
                reviews: {
                    user: {
                        id: userId,
                    },
                },
            },
        })
    }
}
