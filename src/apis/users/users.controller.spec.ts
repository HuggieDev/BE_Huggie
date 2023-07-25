import { Test } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { createMock, DeepMocked } from '@golevelup/ts-jest'
import { CreateUserDto } from './dto/createUser.dto'

describe('UsersController', () => {
    let usersController: UsersController
    let usersService: DeepMocked<UsersService>

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
        })
            .useMocker(createMock)
            .compile()

        usersController = moduleRef.get<UsersController>(UsersController)
        usersService = moduleRef.get(UsersService)
    })

    describe('createUser', () => {
        it('should return an user', async () => {
            const mockUser = createMock<User>()

            usersService.create.mockResolvedValueOnce(mockUser)

            expect(
                await usersController.createUser(createMock<CreateUserDto>())
            ).toBe(mockUser)
        })
    })

    describe('deleteUser', () => {
        it('should return true', async () => {
            usersService.delete.mockResolvedValueOnce(true)
            expect(await usersController.deleteUser('userId')).toBe(true)
        })
    })

    describe('fetchUser', () => {
        it('should return an user', async () => {
            const mockUser = createMock<User>()

            usersService.findOneById.mockResolvedValueOnce(mockUser)
            expect(await usersController.fetchUser('userId')).toBe(mockUser)
        })
    })
})
