import { ApiProperty } from '@nestjs/swagger'
import { Review } from 'src/apis/reviews/entities/review.entity'
import {
    Column,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class ReviewMenu {
    @ApiProperty({
        example: '0ab0d27a-2d34-4bda-a936-29454f014612',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        example: '해장국',
    })
    @Column()
    name: string

    @ApiProperty({
        example: 'review: { id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }',
    })
    @ManyToOne(() => Review)
    review: Review

    @ApiProperty({
        example: null,
    })
    @DeleteDateColumn()
    deletedAt?: Date
}
