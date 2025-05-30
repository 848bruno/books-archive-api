import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  Max,
  MinLength,
} from 'class-validator';

export class CreateBookReviewDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  content: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  bookId: string;

  @IsNotEmpty()
  userId: string;
}
