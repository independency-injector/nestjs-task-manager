import { IsString, MinLength, MaxLength, Matches } from "class-validator";


export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(30)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        { message: 'Password should consist of at least 1 uppercase letter, 1 lowercase letter and at least 1 number or special character'})
    password: string;
}