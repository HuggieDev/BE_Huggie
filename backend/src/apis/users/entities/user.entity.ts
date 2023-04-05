import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { USER_SOCIAL_TYPE_ENUM } from '../types/user.type'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nickName: string

    @Column()
    email: string

    @Column({ type: 'enum', enum: USER_SOCIAL_TYPE_ENUM })
    socialType: string

    @DeleteDateColumn()
    deletedAt: Date
}
