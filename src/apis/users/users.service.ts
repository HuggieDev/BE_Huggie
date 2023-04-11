import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import {
    IUsersServiceFindOneByEmail,
    IUsersServiceFindOneById,
} from './interfaces/user.interface'
import { CreateUserDto } from './dto/createUser.dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
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
}
