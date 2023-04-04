import { Store } from 'src/apis/stores/entities/store.entity'
import { User } from 'src/apis/users/entities/user.entity'
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    contents: string

    @Column({
        type: 'date',
        comment: '식당 방문 날짜(음식을 먹은 날짜) 기록 컬럼',
    })
    visitDate: Date

    @Column({ type: 'decimal', precision: 2, scale: 1 })
    score: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Store)
    store: Store
}
