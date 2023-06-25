import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import {
    IAuthServiceGetAccessToken,
    IAuthServiceLoginOAuth,
    IAuthServiceRestoreAccessToken,
    IAuthServiceSetRefreshToken,
} from './interfaces/auth.interface'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    getAccessToken({ user }: IAuthServiceGetAccessToken): string {
        return this.jwtService.sign(
            { id: user.id },
            { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1h' }
        )
    }

    setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
        const refreshToken = this.jwtService.sign(
            { email: user.email, id: user.id },
            { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' }
        )

        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`)
    }

    restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
        return this.getAccessToken({ user })
    }

    async loginOAuth({ req, res }: IAuthServiceLoginOAuth) {
        // 1. 회원 조회
        let user = await this.usersService.findOneByEmail({
            email: req.user.email,
        })

        // 2. 회원가입 X -> 회원가입 시키기
        if (!user) user = await this.usersService.create({ ...req.user })

        // 3. 회원가입 O -> 로그인
        this.setRefreshToken({ user, res })

        // 4. 리다이렉트
        res.redirect(process.env.SOCIAL_LOGIN_REDIRECT)
    }
}
