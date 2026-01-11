import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginDto {
  @IsEmail()
  @IsNotEmpty({message: "Email field should not be empty"})
  email: string;

  @IsNotEmpty()
  password: string;
}