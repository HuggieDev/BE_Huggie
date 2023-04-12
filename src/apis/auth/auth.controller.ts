import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { IOAuthUser } from './interfaces/auth.interface'
import { ApiExcludeEndpoint, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiExcludeEndpoint()
    @Get('social')
    @ApiOperation({
        summary: '소셜 로그인 API',
        description:
            '카카오로 리다이렉트를 해야하기에 테스트는 안됩니다. method와 endpoint만 확인해 주세요.',
    })
    @UseGuards(AuthGuard('kakao'))
    async loginKakao(
        @Req() req: Request & IOAuthUser, //
        @Res() res: Response
    ) {
        return this.authService.loginOAuth({ req, res })
    }
}
