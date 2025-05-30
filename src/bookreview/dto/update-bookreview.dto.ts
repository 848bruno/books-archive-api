import { PartialType } from '@nestjs/mapped-types';
import { CreateBookReviewDto } from './create-bookreview.dto';

export class UpdateBookreviewDto extends PartialType(CreateBookReviewDto) {}
