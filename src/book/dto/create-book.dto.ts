import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsInt,
  Min,
  Max,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description: string;

  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publicationYear: number;

  @IsUUID()
  authorId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  categoryIds: string[];
}
