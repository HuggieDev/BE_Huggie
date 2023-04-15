import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { USER_SOCIAL_TYPE_ENUM } from '../types/user.type'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@Entity()
export class User {
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        example: '허기져',
        description: '사용자 닉네임',
    })
    @IsNotEmpty()
    @IsString()
    @Column()
    nickName: string

    @IsNotEmpty()
    @IsString()
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
