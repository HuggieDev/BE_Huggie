import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { USER_SOCIAL_TYPE_ENUM } from '../types/user.type'
import { ApiProperty, ApiResponse } from '@nestjs/swagger'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        example: '허기져',
        description: '사용자 닉네임',
    })
    @Column()
    nickName: string

    @ApiProperty({
        example: 'huggie@kakao.com',
        description: '사용자 이메일',
    })
    @Column()
    email: string

    @Column({ type: 'enum', enum: USER_SOCIAL_TYPE_ENUM })
    socialType: string

    @DeleteDateColumn()
    deletedAt: Date
}
