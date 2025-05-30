// src/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;
}
