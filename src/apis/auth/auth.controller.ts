import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { IOAuthUser } from './interfaces/auth.interface'
import {
    ApiBearerAuth,
    ApiCookieAuth,
    ApiOperation,
    ApiResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger'

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @ApiBearerAuth()
    @ApiCookieAuth()
    @Get('social')
    @ApiOperation({
        summary: '소셜 로그인 API',
        description: '소셜 로그인을 한다.',
    })
    @ApiResponse({ status: 200, description: '소셜 로그인 성공' })
    @ApiResponse({ status: 400, description: '소셜 로그인 실패' })
    @UseGuards(AuthGuard('kakao'))
    async loginKakao(
        @Req() req: Request & IOAuthUser, //
        @Res() res: Response
    ) {
        return this.authService.loginOAuth({ req, res })
    }
}
