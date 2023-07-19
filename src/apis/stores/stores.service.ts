import { InjectRepository } from '@nestjs/typeorm'
import { Store } from './entities/store.entity'
import {
    Inject,
    Injectable,
    UnprocessableEntityException,
    forwardRef,
} from '@nestjs/common'
import { Between, FindOptionsWhere, Like, Repository } from 'typeorm'
import { CreateStoreInput } from './dto/createStore.dto'
import {
    IFindStores,
    SearchStoresByAddress,
} from './interfaces/stores.interface'
import { UsersService } from '../users/users.service'
import { ReviewsService } from '../reviews/reviews.service'

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        @Inject(forwardRef(() => ReviewsService))
        private reviewsService: ReviewsService
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
        await this.usersService.findOneById({ userId })

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

    async findStoresByAddress({
        search,
    }: {
        search: string
    }): Promise<SearchStoresByAddress[]> {
        const stores = await this.storeRepository.find({
            where: {
                roadAddress: Like(`%${search}%`),
                jibunAddress: Like(`%${search}%`),
            },
            relations: ['reviews'],
        })

        if (!stores) {
            throw new UnprocessableEntityException('검색된 식당이 없습니다.')
        }

        const result = stores.map((store) => {
            const reviewsCount = store.reviews.length
            const { name, jibunAddress, reviews, ...rest } = store
            return { name, jibunAddress, reviews, reviewsCount }
        })

        return result
    }
}
