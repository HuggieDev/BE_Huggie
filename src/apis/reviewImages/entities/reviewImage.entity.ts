import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator'
import { Review } from 'src/apis/reviews/entities/review.entity'
import {
    Column,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class ReviewImage {
    @ApiProperty({
        example: '6ac98445-e26a-4b4b-81a4-7793b6a8a800',
    })
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        example:
            'https://github.com/Daseul1/nestjs_basic/blob/master/images/cherry.png',
    })
    @IsNotEmpty()
    @Column()
    url: string

    @ApiProperty({
        example: '2023-05-28T06:48:36.000Z',
    })
    @IsDateString()
    @DeleteDateColumn()
    deletedAt?: Date

    @ApiProperty({
        type: () => Review,
        example: 'review: { id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }',
    })
    @ManyToOne(() => Review)
    review: Review
}
