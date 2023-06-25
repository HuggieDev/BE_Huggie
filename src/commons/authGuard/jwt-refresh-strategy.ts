import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { config } from 'dotenv'
import { getRefreshTokenInCookie } from '../util/utils'

config()

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {
        super({
            jwtFromRequest: (req) => {
                const cookies = req.headers.cookie
                if (cookies) return getRefreshTokenInCookie(cookies)
            },
            secretOrKey: process.env.JWT_REFRESH_KEY,
        })
    }

    async validate(req: any, payload: any) {
        return {
            id: payload.id,
            email: payload.email,
        }
    }
}
