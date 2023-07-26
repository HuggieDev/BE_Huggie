import {
    ConflictException,
    Inject,
    Injectable,
    UnprocessableEntityException,
    forwardRef,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import {
    IUsersServiceDelete,
    IUsersServiceFindOneByEmail,
    IUsersServiceFindOneById,
    IUsersServiceFindOneUser,
} from './interfaces/user.interface'
import { CreateUserDto } from './dto/createUser.dto'
import { ReviewsService } from '../reviews/reviews.service'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        @Inject(forwardRef(() => ReviewsService))
        private reviewService: ReviewsService
    ) {}

    async findOneUser({ email }: IUsersServiceFindOneUser): Promise<User> {
        const user = await this.findOneByEmail({ email })

        if (!user) {
            throw new UnprocessableEntityException('유저가 존재하지 않습니다')
        }

        return user
    }

    async findOneById({ userId }: IUsersServiceFindOneById): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        })

        if (!user) {
            throw new UnprocessableEntityException('유저가 존재하지 않습니다')
        }

        return user
    }

    async findOneByEmail({
        email,
    }: IUsersServiceFindOneByEmail): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { email },
        })

        return user
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, nickName } = createUserDto

        const userCheck = await this.findOneByEmail({ email })
        if (userCheck) throw new ConflictException('이미 등록된 이메일입니다.')

        return this.usersRepository.save({
            email,
            nickName,
        })
    }

    async delete({ userId }: IUsersServiceDelete): Promise<boolean> {
        await this.findOneById({ userId })

        await this.reviewService.deleteByUserId({ userId })

        const result = await this.usersRepository.softDelete({
            id: userId,
        })
        return result.affected ? true : false
    }
}
