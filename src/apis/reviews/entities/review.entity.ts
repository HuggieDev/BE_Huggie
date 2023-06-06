import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsUUID, IsNotEmpty, IsString } from 'class-validator'
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
    @ApiProperty({
        example: '665a22a7-d465-4cf4-a27c-f8366c2ff83f',
    })
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        example: '내용',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @Column()
    contents: string

    @ApiProperty({
        example: '2023-04-12',
        required: true,
    })
    @IsNotEmpty()
    @Column({
        type: 'date',
        comment: '식당 방문 날짜(음식을 먹은 날짜) 기록 컬럼',
    })
    visitDate: Date

    @ApiProperty({
        example: 4.0,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Column({ type: 'decimal', precision: 2, scale: 1 })
    score: number

    @ApiProperty({
        example: '2023-04-12T06:48:36.266Z',
    })
    @CreateDateColumn()
    createdAt: Date

    @ApiProperty({
        example: '2023-04-12T06:48:36.000Z',
    })
    @UpdateDateColumn()
    updatedAt: Date

    @ApiProperty({
        example: null,
    })
    @DeleteDateColumn()
    deletedAt?: Date

    @ApiProperty({
        example:
            'user: { id: 0dc011aa-d76e-11ed-afa1-0242ac120002, nickname: 허기져, email: huggie@kakao.com, socialType: KAKAO, deletedAt: null }',
    })
    @ManyToOne(() => User)
    user: User

    @ApiProperty({
        example:
            'stroe: { name: 제주은희네해장국 구로디지털단지점, lat: 37.4855, lng: 126.8967, roadAddresss: 도로명, jibunaddress: 지번, id: f1fd6586-9bdc-458b-8da8-1f96eff7f6fd }',
    })
    @ManyToOne(() => Store)
    store: Store

    @ApiProperty({
        example:
            'reviewImages: [{ url: url1, review: { id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }, id: 6ac98445-e26a-4b4b-81a4-7793b6a8a800 },{ url: url2, review: { id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }, id: bee0bf7e-e6bc-4aff-ac2b-a0e25b828957 }]',
    })
    @OneToMany(() => ReviewImage, (reviewImages) => reviewImages.review)
    reviewImages: ReviewImage[]

    @ApiProperty({
        example:
            'reviewMenus: [{ name: 해장국, reivew:{ id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }, id: 0ab0d27a-2d34-4bda-a936-29454f014612 }, { name: 수육, review: { id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }, id: 889675ad-e3fe-4fe1-ad0d-6b06f5447f41 }]',
    })
    @OneToMany(() => ReviewMenu, (reviewMenus) => reviewMenus.review)
    reviewMenus: ReviewMenu[]
}
