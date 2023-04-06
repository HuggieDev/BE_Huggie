import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { IOAuthUser } from './interfaces/auth.interface'

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('social')
    @UseGuards(AuthGuard('kakao'))
    async loginKakao(
        @Req() req: Request & IOAuthUser, //
        @Res() res: Response
    ) {
        return this.authService.loginOAuth({ req, res })
    }
}
