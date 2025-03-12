import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserSignUpDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  password: string;
}
