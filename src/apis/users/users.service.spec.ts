import { createMock, DeepMocked } from '@golevelup/ts-jest'
import { Test } from '@nestjs/testing'
import { UsersService } from './users.service'
import { ReviewsService } from '../reviews/reviews.service'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('UsersService', () => {
    let usersService: UsersService
    let reviewService: DeepMocked<ReviewsService>
    let usersRepository

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: createMock<Repository<User>>({
                        findOne: jest
                            .fn()
                            .mockResolvedValue(createMock<User>()),
                    }),
                },
            ],
        })
            .useMocker(createMock)
            .compile()

        usersService = moduleRef.get<UsersService>(UsersService)
        reviewService = moduleRef.get(ReviewsService)
        usersRepository = moduleRef.get(getRepositoryToken(User))
    })

    describe('findOneById', () => {
        const mockUserId = 'userId'
        it('user가 없으면 에러 발생', async () => {
            usersRepository.findOne.mockResolvedValueOnce(null)
            try {
                await usersService.findOneById({ userId: mockUserId })
            } catch (error) {
                expect(error.message).toBe('유저가 존재하지 않습니다')
            }
        })
    })
})
