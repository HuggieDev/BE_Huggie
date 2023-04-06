import { Request, Response } from 'express'
import { User } from 'src/apis/users/entities/user.entity'

export interface IAuthServiceGetAccessToken {
    user: User | IAuthUser['user']
}

export interface IAuthServiceSetRefreshToken {
    user: User
    res: Response
}

export interface IAuthServiceRestoreAccessToken {
    user: IAuthUser['user']
}

export interface IAuthUser {
    user?: {
        id: string
    }
}

export interface IOAuthUser {
    user: Omit<User, 'id'>
}

export interface IAuthServiceLoginOAuth {
    req: Request & IOAuthUser
    res: Response
}
