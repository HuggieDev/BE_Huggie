import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { Test } from '@nestjs/testing'
import {
    IAuthServiceRestoreAccessToken,
    IOAuthUser,
} from './interfaces/auth.interface'
import { Request, Response } from 'express'

describe('UsersController', () => {
    let authController: AuthController
    let authService: DeepMocked<AuthService>

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [AuthController],
        })
            .useMocker(createMock)
            .compile()

        authController = moduleRef.get<AuthController>(AuthController)
        authService = moduleRef.get(AuthService)
    })

    describe('loginKakao', () => {
        it('loginOAuth를 호출하고 undefined를 반환', async () => {
            const mockReq: Request & IOAuthUser = createMock<
                Request & IOAuthUser
            >()
            const mockRes: Response = createMock<Response>()
            authService.loginOAuth.mockResolvedValueOnce(undefined)

            const result = await authController.loginKakao(mockReq, mockRes)

            expect(result).toBe(undefined)
            expect(authService.loginOAuth).toHaveBeenCalledWith({
                req: mockReq,
                res: mockRes,
            })
        })
    })

    describe('restoreAccessToken', () => {
        it('authService.restoreAccessToken를 호출하고 토큰을 반환', async () => {
            const mockReq: Request & IAuthServiceRestoreAccessToken =
                createMock<Request & IAuthServiceRestoreAccessToken>()
            const mockToken = 'accessToken'
            authService.restoreAccessToken.mockReturnValueOnce(mockToken)

            const result = await authController.restoreAccessToken(mockReq)

            expect(result).toBe(mockToken)
        })
    })
})
