import { createMock, DeepMocked } from '@golevelup/ts-jest'
import { Test } from '@nestjs/testing'
import { UsersService } from './users.service'
import { ReviewsService } from '../reviews/reviews.service'
import { Repository, UpdateResult } from 'typeorm'
import { User } from './entities/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('UsersService', () => {
    let usersService: UsersService
    let reviewService: DeepMocked<ReviewsService>
    let usersRepository
    const mockUserId = 'userId'
    const mockUserEmail = 'email'
    const mockUSerNickName = 'userName'

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: createMock<Repository<User>>({
                        findOne: jest.fn().mockResolvedValue(
                            createMock<User>({
                                id: mockUserId,
                                email: mockUserEmail,
                            })
                        ),
                        save: jest.fn().mockResolvedValue(
                            createMock<User>({
                                email: mockUserEmail,
                                nickName: mockUSerNickName,
                            })
                        ),
                        softDelete: jest
                            .fn()
                            .mockResolvedValue(
                                createMock<UpdateResult>({ affected: 1 })
                            ),
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
        it('user가 없으면 에러 발생', async () => {
            usersRepository.findOne.mockResolvedValueOnce(null)
            try {
                await usersService.findOneById({ userId: mockUserId })
            } catch (error) {
                expect(error.message).toBe('유저가 존재하지 않습니다')
            }
        })

        it('동일한 userId를 찾아 user 리턴', async () => {
            const result = await usersService.findOneById({
                userId: mockUserId,
            })
            expect(result.id).toBe(mockUserId)
        })
    })

    describe('findOneByEmail', () => {
        it('user가 없으면 에러 발생', async () => {
            usersRepository.findOne.mockResolvedValueOnce(null)
            try {
                await usersService.findOneByEmail({ email: 'email' })
            } catch (error) {
                expect(error.message).toBe('유저가 존재하지 않습니다')
            }
        })
        it('동일한 이메일을 찾아 user 리턴', async () => {
            const result = await usersService.findOneByEmail({
                email: mockUserEmail,
            })
            expect(result.email).toBe(mockUserEmail)
        })
    })

    describe('create', () => {
        it('이메일 중복된 유저가 있으면 에러 발생', async () => {
            try {
                await usersService.create({
                    email: mockUserEmail,
                    nickName: expect.any(String),
                })
            } catch (error) {
                expect(error.message).toBe('이미 등록된 이메일입니다.')
            }
        })

        it('넘겨준 email과 nickName을 가진 user 리턴', async () => {
            usersService.findOneByEmail = jest.fn().mockResolvedValueOnce(null)
            const result = await usersService.create({
                email: mockUserEmail,
                nickName: mockUSerNickName,
            })
            expect(result.email).toBe(mockUserEmail)
            expect(result.nickName).toBe(mockUSerNickName)
        })
    })

    describe('delete', () => {
        it('true를 리턴', async () => {
            usersService.findOneById = jest.fn()
            const result = await usersService.delete({ userId: mockUserId })
            expect(result).toBe(true)
            expect(usersService.findOneById).toHaveBeenCalledTimes(1)
            expect(reviewService.deleteByUserId).toHaveBeenCalledWith({
                userId: mockUserId,
            })
            expect(usersRepository.softDelete).toHaveBeenCalledWith({
                id: mockUserId,
            })
        })
    })
})
