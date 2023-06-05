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

    async findOneById({ userId }: IUsersServiceFindOneById): Promise<User> {
        return await this.usersRepository.findOne({ where: { id: userId } })
    }

    findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
        return this.usersRepository.findOne({ where: { email } })
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
        const user = await this.findOneById({ userId })

        if (!user) {
            throw new UnprocessableEntityException('유저가 존재하지 않습니다')
        }

        await this.reviewService.deleteByUserId({ userId })

        const result = await this.usersRepository.softDelete({
            id: userId,
        })
        return result.affected ? true : false
    }
}
