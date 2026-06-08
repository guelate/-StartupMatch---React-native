import { IsEnum, IsString, IsEmail, MinLength } from "class-validator"

export class RegisterDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;

    @IsEnum(["FOUNDER", "DEVELOPER"])
    role: "FOUNDER" | "DEVELOPER"

}