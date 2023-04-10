import { Review } from 'src/apis/reviews/entities/review.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ReviewImage {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    url: string

    @ManyToOne(() => Review)
    review: Review
}
