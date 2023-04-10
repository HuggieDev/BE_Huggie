import { IsNumber, IsUUID, IsNotEmpty, Min } from 'class-validator'
import { ReviewImage } from 'src/apis/reviewImages/entities/reviewImage.entity'

import { ReviewMenu } from 'src/apis/reviewMenus/entities/reviewMenu.entity'
import { Store } from 'src/apis/stores/entities/store.entity'
import { User } from 'src/apis/users/entities/user.entity'
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Review {
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @Column()
    contents: string

    @IsNotEmpty()
    @Column({
        type: 'date',
        comment: '식당 방문 날짜(음식을 먹은 날짜) 기록 컬럼',
    })
    visitDate: Date

    @Min(0)
    @IsNumber({ maxDecimalPlaces: 1 })
    @Column({ type: 'decimal', precision: 2, scale: 1 })
    score: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt?: Date

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Store)
    store: Store

    @OneToMany(() => ReviewImage, (reviewImages) => reviewImages.review)
    reviewImages: ReviewImage[]

    @OneToMany(() => ReviewMenu, (reviewMenus) => reviewMenus.review)
    reviewMenus: ReviewMenu[]
}
