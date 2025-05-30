import { IsOptional, IsString, IsUrl, IsDateString } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
