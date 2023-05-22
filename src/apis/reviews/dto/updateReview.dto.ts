import { PartialType } from '@nestjs/swagger'
import { CreateReviewInput } from './createReview.dto'

export class UpdateReviewInput extends PartialType(CreateReviewInput) {}
