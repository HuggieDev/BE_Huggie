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
    title: string

    @Column()
    contents: string

    @Column({ type: 'date' })
    date: Date

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
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
