import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-kakao'

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor() {
        super({
            clientID: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
            callbackURL: process.env.KAKAO_CLIENT_CALLBACK,
        })
    }

    validate(accessToken: string, refreshToken: string, profile: Profile) {
        return {
            nickName: profile.displayName,
            email: profile._json.kakao_account.email,
        }
    }
}
