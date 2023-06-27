import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtKakaoStrategy } from './strategies/jwt-social-kakao.strategy'
import { JwtAccessStrategy } from 'src/commons/authGuard/jwt-access-strategy'
import { JwtRefreshStrategy } from 'src/commons/authGuard/jwt-refresh-strategy'

@Module({
    imports: [JwtModule.register({}), UsersModule],
    controllers: [AuthController],
    providers: [
        JwtKakaoStrategy, //
        JwtAccessStrategy,
        JwtRefreshStrategy,
        AuthService,
    ],
})
export class AuthModule {}
