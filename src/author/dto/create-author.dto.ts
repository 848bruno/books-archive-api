import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsDateString
} from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  bio?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;
}

