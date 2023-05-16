import { InjectRepository } from '@nestjs/typeorm'
import { Store } from './entities/store.entity'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { Between, FindOptionsWhere, Repository } from 'typeorm'
import { CreateStoreInput } from './dto/createStore.dto'
import { IFindStores } from './interfaces/stores.interface'
import { UsersService } from '../users/users.service'

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
        private readonly usersService: UsersService
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
        const user = await this.usersService.findOneById({ userId })
        if (!user) {
            throw new UnprocessableEntityException('유저가 존재하지 않습니다')
        }

        // 1도의 차이에 해당하는 좌표를 계산하기 위한 변환 비율
        const latitudeRatio = 0.00000899322
        const longitudeRatio = 0.00001096699

        // 주어진 좌표에서 radius미터만큼 떨어진 좌표 계산
        const latitudeDiff = radius * latitudeRatio
        const longitudeDiff = radius * longitudeRatio

        const targetLatitude = lat + latitudeDiff
        const targetLongitude = lng + longitudeDiff

        return await this.storeRepository.find({
            where: {
                lat: Between(lat, targetLatitude),
                lng: Between(lng, targetLongitude),
                reviews: {
                    user: {
                        id: userId,
                    },
                },
            },
            relations: ['reviews', 'reviews.user'],
        })
    }
}
