import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class ForgotPasswordDto {

    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    baseUrl: string;

}