import { IsNotEmpty, IsDecimal, IsUUID } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Store {
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @Column()
    name: string

    @IsDecimal()
    @Column({ type: 'decimal', precision: 9, scale: 6 })
    lat: number

    @IsDecimal()
    @Column({ type: 'decimal', precision: 9, scale: 6 })
    lng: number

    @IsNotEmpty()
    @Column()
    roadAddress: string

    @IsNotEmpty()
    @Column()
    jibunAddress: string
}
//TODO: lat, lng에 인덱싱
