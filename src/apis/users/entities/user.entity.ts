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
    @ApiProperty({
        example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
    })
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        example: '허기져',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @Column()
    nickName: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'huggie@kakao.com',
        required: true,
    })
    @Column()
    email: string

    @ApiProperty({
        example: 'KAKAO',
        type: 'enum',
    })
    @Column({ type: 'enum', enum: USER_SOCIAL_TYPE_ENUM })
    socialType: string

    @ApiProperty({
        example: null,
    })
    @DeleteDateColumn()
    deletedAt: Date
}
