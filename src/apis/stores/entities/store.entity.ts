import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator'
import { Review } from 'src/apis/reviews/entities/review.entity'
import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Store {
    @ApiProperty({
        example: 'f1fd6586-9bdc-458b-8da8-1f96eff7f6fd',
    })
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        example: '제주은희네해장국 구로디지털단지점',
        required: true,
    })
    @IsNotEmpty()
    @Column()
    name: string

    @ApiProperty({
        example: 37.4855,
    })
    @Type(() => Number)
    @IsNumber()
    @Index()
    @Column({ type: 'decimal', precision: 9, scale: 6 })
    lat: number

    @ApiProperty({
        example: 126.8967,
    })
    @Type(() => Number)
    @IsNumber()
    @Index()
    @Column({ type: 'decimal', precision: 9, scale: 6 })
    lng: number

    @ApiProperty({
        example: '서울 구로구 디지털로 300 지밸리비즈플라자 1층 104-2호',
        required: true,
    })
    @IsNotEmpty()
    @Column()
    roadAddress: string

    @ApiProperty({
        example: '서울 구로구 구로동 188-25 지밸리비즈플라자',
        required: true,
    })
    @IsNotEmpty()
    @Column()
    jibunAddress: string

    @ApiProperty({
        example: 'review: { id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }',
    })
    @OneToMany(() => Review, (reviews) => reviews.store)
    reviews: Review[]
}
