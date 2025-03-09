import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSignUpDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
