import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Store {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ type: 'decimal', precision: 9, scale: 6 })
    lat: number

    @Column({ type: 'decimal', precision: 9, scale: 6 })
    lng: number

    @Column()
    roadAddress: string

    @Column()
    jibunAddress: string
}
